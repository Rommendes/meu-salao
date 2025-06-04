// backend/src/routes/cobrancaRoutes.js
import express from 'express';
import enviarMensagem from '../services/enviarMensagemWhatsApp.js';

const router = express.Router();

// Defina uma rota para enviar uma cobrança via WhatsApp
router.post('/enviar-cobranca', async (req, res) => {
  const { nome, telefone, valor } = req.body;

  console.log('Telefone recebido no backend:', telefone);  // Verifique se o telefone está correto

  try {
    const messageSid = await enviarMensagem(nome, telefone, valor);
    res.status(200).json({ message: 'Cobrança enviada com sucesso!', messageSid });
  } catch (error) {
    console.error("Erro ao enviar cobrança:", error);
    res.status(500).json({ message: 'Erro ao enviar cobrança', error: error.message });
  }
});


export default router;


