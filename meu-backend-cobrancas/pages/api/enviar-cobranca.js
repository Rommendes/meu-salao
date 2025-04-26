export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ erro: 'Método não permitido' });
    }
  
    const { nome, telefone, valor } = req.body;
  
    if (!nome || !telefone || !valor) {
      return res.status(400).json({ erro: 'Dados incompletos' });
    }
  
    const mensagem = `Olá ${nome}, notamos que há um pagamento pendente no valor de R$ ${valor} referente ao seu atendimento. Por favor, entre em contato para regularizar. Obrigada! 💇‍♀️`;
  
    const url = `https://api.callmebot.com/whatsapp.php?phone=55${telefone}&text=${encodeURIComponent(mensagem)}&apikey=${process.env.CALLMEBOT_API_KEY}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao enviar: ${response.statusText}`);
      }
  
      return res.status(200).json({ sucesso: true });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error.message);
      return res.status(500).json({ sucesso: false, erro: error.message });
    }
  }
  