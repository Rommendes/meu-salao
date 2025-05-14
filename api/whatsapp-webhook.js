//api/whatsapp-webhook.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const mensagem = req.body.Body;
    const remetente = req.body.From;
    
    console.log('Mensagem recebida:', mensagem);
    console.log('Remetente:', remetente);

    // Responde a mensagem
    res.status(200).send('<Response><Message>Recebemos sua mensagem!</Message></Response>');
  } else {
    res.status(405).send('Método não permitido');
  }
}
