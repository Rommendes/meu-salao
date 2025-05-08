//src/services/cobrancasService.js
import supabase from '../lib/supabase.js';
import formatarTelefone from '../utilitarios/formatarTelefone.js';
import formatarValor from '../utilitarios/formatarValor.js';
import fetch from 'node-fetch';

export async function enviarCobrancasPendentes() {
  const { data: agendamentos, error } = await supabase
    .from('agendamentos')
    .select(`*, clientes (nome, telefone)`)
    .eq('pagamento', 'pendente');

  if (error) throw new Error('Erro ao buscar dados: ' + error.message);

  const mensagens = [];

  for (const agendamento of agendamentos) {
    const { clientes, valor } = agendamento;
    const telefone = formatarTelefone(clientes.telefone);
    const valorFormatado = formatarValor(valor);

    const mensagem = `Olá ${clientes.nome}, você está com uma pendência de R$ ${valorFormatado}. Por favor, entre em contato.`;
    const url = `https://api.callmebot.com/whatsapp.php?phone=${telefone}&text=${encodeURIComponent(mensagem)}&apikey=${process.env.CALLMEBOT_KEY}`;

    const resposta = await fetch(url);
    const texto = await resposta.text();

    mensagens.push({ telefone, status: texto });
  }

  return mensagens;
}
