// backend/src/routes/cobrancasRoutes.js
import express from "express";
import { buscarCobrancasPendentes } from "../services/cobrancasServices.js";
import { enviarCobranca } from "../controllers/cobrancasController.js";

const router = express.Router();

// Rota GET principal
router.get("/", async (req, res) => {
  try {
    const dados = await buscarCobrancasPendentes();
    res.json(dados);
  } catch (error) {
    console.error("Erro ao buscar cobranças:", error);
    res.status(500).json({ error: "Erro ao buscar cobranças pendentes" });
  }
});

// Rota POST para enviar cobranças
router.post("/enviar-cobrancas", enviarCobranca);

export default router;