import fetch from 'node-fetch';

const fetch = require('node-fetch');

const enviarMensagem = async (telefone, mensagem) => {
  const response = await fetch(`https://waba.360dialog.io/v1/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient_type: 'individual',
      to: telefone,
      type: 'text',
      text: { body: mensagem }
    })
  });

  const data = await response.json();
  return data;
};

module.exports = enviarMensagem;
