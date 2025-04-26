import fetch from "node-fetch";

export async function sendCobranca({ nome, telefone, valor }) {
  const mensagem = `Olá ${nome}, notamos que há um pagamento pendente no valor de R$ ${valor} referente ao seu atendimento. Por favor, entre em contato para regularizar. Obrigada! 💇‍♀️`;
  const url = `https://api.callmebot.com/whatsapp.php?phone=55${telefone}&text=${encodeURIComponent(mensagem)}&apikey=${process.env.CALLMEBOT_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao enviar`);
    }
    return { sucesso: true };
  } catch (error) {
    console.error("Erro no backend ao enviar cobrança:", error.message);
    return { sucesso: false, erro: error.message };
  }
}
