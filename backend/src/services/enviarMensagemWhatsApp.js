import fetch from 'node-fetch';

export async function enviarMensagemWhatsApp(nome, telefone, valor) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: telefone,
    type: "text",
    text: {
      body: `Olá ${nome}, você está com uma pendência de R$ ${valor}. Por favor, entre em contato.`
    }
  };

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const resultado = await resposta.json();
    console.log("✅ Enviado via WhatsApp:", resultado);
    return resultado;
  } catch (error) {
    console.error("❌ Erro ao enviar WhatsApp:", error);
    throw error;
  }
}
