
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
    // Remover todos os caracteres não numéricos do telefone
    const telefoneFormatado = telefone.replace(/\D/g, '');  // Remove todos os caracteres não numéricos

    // Verifique se o telefone tem 11 dígitos (formato de celular brasileiro)
    if (telefoneFormatado.length === 11) {
      // Adiciona o prefixo do WhatsApp
      const telefoneTwilio = `whatsapp:+55${telefoneFormatado}`;

      console.log('Telefone formatado para Twilio:', telefoneTwilio);  // Verifique o telefone formatado

      const mensagem = `Olá ${nome}, sua cobrança no valor de ${valor} foi gerada.`;

      const resultado = await client.messages.create({
        body: mensagem,
        from: 'whatsapp:+14155238886',  // Número do WhatsApp do Twilio
        to: telefoneTwilio  // Passa o telefone formatado diretamente
      });

      return resultado;
    } else {
      throw new Error('Número de telefone inválido');
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;  // Re-lançar erro para ser tratado no controller
  }
};

export default enviarMensagemWhatsApp;



