import express from "express";
import { buscarCobrancasPendentes } from "../services/cobrancasServices.js"

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dados = await buscarCobrancasPendentes();
    res.json(dados);
  } catch (error) {
    console.error("Erro ao buscar cobranças:", error);
    res.status(500).json({ error: "Erro ao buscar cobranças pendentes" });
  }
});

export default router;
