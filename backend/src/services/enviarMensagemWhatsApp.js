
// backend/src/services/enviarMensagemWhatsApp.js
import dotenv from 'dotenv';
dotenv.config();  // Carregar variáveis de ambiente

import twilio from 'twilio';  // Importando a biblioteca Twilio

const accountSid = process.env.TWILIO_ACCOUNT_SID;  // SID do Twilio
const authToken = process.env.TWILIO_AUTH_TOKEN;  // Token de autenticação do Twilio

console.log('TWILIO_ACCOUNT_SID:', accountSid);  // Verifique se o SID está sendo lido corretamente
console.log('TWILIO_AUTH_TOKEN:', authToken);

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
    console.error("Erro ao enviar mensagem:", error.message || error);
    throw new Error(`Erro ao enviar mensagem para o número ${telefone}: ${error.message || error}`);
  }
};

export default enviarMensagemWhatsApp;



