import express from 'express';
import { enviarCobrancasPendentes } from '../services/cobrancasService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const resultado = await enviarCobrancasPendentes();
    res.json({ sucesso: true, resultado });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, erro: erro.message });
  }
});

export default router;
