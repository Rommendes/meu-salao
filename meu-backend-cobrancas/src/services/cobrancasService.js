import axios from "axios";

export async function enviarMensagemCobranca({ nome, telefone, valor }) {
  if (!nome || !telefone || !valor) {
    throw new Error('Dados incompletos');
  }

  const mensagem = `Olá ${nome}, notamos que há um pagamento pendente no valor de R$ ${valor} referente ao seu atendimento. Por favor, entre em contato para regularizar. Obrigada! 💇‍♀️`;

  const url = `https://api.callmebot.com/whatsapp.php?phone=55${telefone}&text=${encodeURIComponent(mensagem)}&apikey=${process.env.CALLMEBOT_API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Erro ao enviar: ${response.statusText}`);
    }

    return { sucesso: true };
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error.message);
    throw new Error(error.message);
  }
}
