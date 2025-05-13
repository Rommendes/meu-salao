// src/services/enviarMensagemWhatsapp.js
const twilio = require('twilio');

// Carregar as credenciais da sua conta Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // SID do Twilio
const authToken = process.env.TWILIO_AUTH_TOKEN; // Auth Token do Twilio

// Inicializar o cliente Twilio
const client = twilio(accountSid, authToken);

// Função para enviar mensagem via WhatsApp com Twilio
const enviarMensagem = async (telefone, mensagem) => {
  try {
    // Enviando a mensagem via Twilio
    const mensagemEnviada = await client.messages.create({
      body: mensagem, // Mensagem a ser enviada
      from: 'whatsapp:+15557625716', // Seu número de WhatsApp no Twilio
      to: `whatsapp:${telefone}`, // Número do destinatário no formato WhatsApp
    });

    // Exibir o SID da mensagem enviada no console (para monitoramento)
    console.log('Mensagem enviada com sucesso:', mensagemEnviada.sid);
    return mensagemEnviada;
  } catch (error) {
    // Em caso de erro, exibe no console
    console.error('Erro ao enviar mensagem:', error);
    throw new Error('Erro ao enviar mensagem via Twilio');
  }
};

module.exports = { enviarMensagem }; // Exporta a função para ser usada em outros arquivos

