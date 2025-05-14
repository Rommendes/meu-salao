// backend > src > servicos > enviarMensagemWhatsApp.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;  // SID do Twilio
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Auth Token do Twilio
const client = twilio(accountSid, authToken);

const enviarMensagem = async (nome, telefone, valor) => {
  try {
    const mensagem = `Olá ${nome}, sua cobrança no valor de ${valor} foi gerada.`;

    const resultado = await client.messages.create({
      body: mensagem,  // Mensagem que será enviada
      from: 'whatsapp:+15557625716',  // Seu número de WhatsApp Twilio
      to: `whatsapp:${telefone}`,  // Número do destinatário
    });

    return resultado;
  } catch (error) {
    console.error('Erro ao enviar mensagem via Twilio:', error);
    throw new Error('Erro ao enviar mensagem via Twilio');
  }
};

module.exports = { enviarMensagem };  // Exportando com module.exports
