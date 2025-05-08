//src/controllers/cobrancaController.js
import { enviarCobrancasPendentes } from '../services/cobrancasService.js';

export async function enviarCobrancas(req, res) {
  try {
    const resultado = await enviarCobrancasPendentes();
    res.json({ success: true, resultado });
  } catch (error) {
    console.error('Erro ao enviar cobranças:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
