import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cobrancaRouter from './api/enviar-cobrancas.js';

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para enviar cobranças
app.use('/api/enviar-cobrancas', cobrancaRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

