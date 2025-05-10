//src/services/cobrancasService.js
import supabase from '../lib/supabase.js';
import formatarTelefone from '../utilitarios/formatarTelefone.js';
import formatarValor from '../utilitarios/formatarValor.js';
import fetch from 'node-fetch';

// 🔁 Envio em lote (via Supabase)
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
console.log("🔑 Chave:", process.env.CALLMEBOT_KEY);

  return mensagens;
}

// ✅ Envio individual (via botão do frontend)
export async function enviarCobrancaUnica(nome, telefone, valor) {
  
  const valorFormatado = formatarValor(valor);
  const telefoneFormatado = formatarTelefone(telefone);

  console.log("🔑 Chave:", process.env.CALLMEBOT_KEY); // ou API_KEY, dependendo de qual usou


  const mensagem = `Olá ${nome}, você está com uma pendência de R$ ${valorFormatado}. Por favor, entre em contato.`;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${telefoneFormatado}&text=${encodeURIComponent(mensagem)}&apikey=${process.env.CALLMEBOT_KEY}`;

  console.log("📨 Enviando mensagem única:");
  console.log("➡️ Nome:", nome);
  console.log("➡️ Telefone:", telefoneFormatado);
  console.log("➡️ Mensagem:", mensagem);
  console.log("➡️ URL:", url);

  try {
    const resposta = await fetch(url);
    const texto = await resposta.text();

    console.log("✅ Resposta da CallMeBot:", texto);
    return { success: true, status: texto };
  } catch (error) {
    console.error("❌ Erro ao enviar cobrança única:", error);
    return { success: false, error: error.message };
  }
}
