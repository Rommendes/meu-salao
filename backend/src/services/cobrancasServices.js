import { supabase } from '../lib/supabase.js';
import axios from "axios";
import { formatarTelefone } from "../utilitarios/formatarTelefone.js"; 

export async function buscarCobrancasPendentes() {
  const { data, error } = await supabase
    .from("agendamentos")
    .select(`
      id,
      data,
      horario,
      servico,
      valor,
      cliente_id,
      pagamento,
      clientes (nome, telefone)
    `)
    .eq("pagamento", "Não Pagou");

  if (error) {
    console.error("Erro ao buscar pendências:", error);
    throw new Error("Erro ao buscar pendências");
  }

  return data;
}

export async function enviarMensagemWhatsApp(telefone, mensagem) {
  try {
    const telefoneFormatado = formatarTelefone(telefone);

    // Validação simples: Telefone deve ter entre 12 e 13 caracteres após formatar
    if (!telefoneFormatado || telefoneFormatado.length < 12 || telefoneFormatado.length > 13) {
      console.error("Telefone inválido:", telefoneFormatado);
      return false; // Não tenta enviar se o telefone for inválido
    }

    const resp = await axios.get("https://api.callmebot.com/whatsapp.php", {
      params: {
        phone: telefoneFormatado,
        text: mensagem,
        apikey: process.env.CALLMEBOT_API_KEY,
      },
    });

    if (resp.data.includes("Message successfully sent")) {
      return true;
    } else {
      console.error("Erro ao enviar mensagem:", resp.data);
      return false;
    }
  } catch (error) {
    console.error("Erro ao enviar WhatsApp:", error);
    return false;
  }
}


export async function processarCobrancas() {
  const pendencias = await buscarCobrancasPendentes();

  let sucessoTotal = true;

  for (const agendamento of pendencias) {
    const { clientes, valor, servico, data: dataAgendamento } = agendamento;
    const telefone = clientes?.telefone;

    if (!telefone) {
      console.error("Telefone não encontrado para cliente:", clientes);
      sucessoTotal = false;
      continue;
    }

    const mensagem = `Olá ${clientes.nome}, lembramos que o pagamento do serviço "${servico}" realizado no dia ${dataAgendamento} está pendente no valor de R$ ${valor}. Por favor, entre em contato para regularizar. Obrigado!`;

    const enviado = await enviarMensagemWhatsApp(telefone, mensagem);

    if (!enviado) {
      sucessoTotal = false;
    }
  }

  return sucessoTotal;
}
