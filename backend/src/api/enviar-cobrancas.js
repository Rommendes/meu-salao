//backend/src/api/cobrancas/-cobrancas
import express from 'express';
import { enviarCobrancasPendentes } from "../services/cobrancasService.js";
const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, telefone, valor } = req.body;

  if (!nome || !telefone || !valor) {
    return res.status(400).json({ message: "Nome, telefone e valor são obrigatórios." });
  }
  console.log("Dados recebidos:", { nome, telefone, valor });
  const telefoneLimpo = telefone.replace(/\D/g, "");
  if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
    return res.status(400).json({ message: "Telefone inválido. Verifique o número." });
  }

  try {
    const resposta = await enviarCobrancasPendentes(nome, telefoneLimpo, valor);

    if (resposta.success) {
      return res.status(200).json({ message: "Cobrança enviada com sucesso!" });
    } else {
      return res.status(500).json({ message: "Falha no envio da cobrança." });
    }
  } catch (error) {
    console.error("Erro ao enviar cobrança:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

export default router;
