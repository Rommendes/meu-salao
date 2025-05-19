
// backend > src > services > enviarMensagemWhatsapp.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;  // SID do Twilio
const authToken = process.env.TWILIO_AUTH_TOKEN;  // Token de autenticação do Twilio

const client = twilio(accountSid, authToken);

const enviarMensagemWhatsApp = async (nome, telefone, valor) => {
  try {
    const mensagem = `Olá ${nome}, sua cobrança no valor de ${valor} foi gerada.`;

    const resultado = await client.messages.create({
      body: mensagem,
      from: 'whatsapp:+15557625716',  // Número de WhatsApp do Twilio
      to: `whatsapp:${telefone}`      // Número de telefone do cliente
    });

    return resultado;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;  // Re-lançar erro para ser tratado no controller
  }
};

module.exports = { enviarMensagemWhatsApp };
