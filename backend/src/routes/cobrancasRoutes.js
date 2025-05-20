
// src/routes/cobrancasRoutes.js
import express from 'express';
import { enviarCobrancas } from '../controllers/cobrancaController.js';

const router = express.Router();

router.post('/enviar', enviarCobrancas); // POST para /api/cobrancas/enviar

export  default router  ;
