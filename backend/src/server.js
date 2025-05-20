// backend > src > server.js
import dotenv from 'dotenv';
dotenv.config();  // Carregar as variáveis de ambiente do arquivo .env

import express from 'express';
import cors from 'cors';
import cobrancaRoutes from './routes/cobrancaRoutes.js';  // Rota de cobranças

const app = express();

app.use(express.json());  // Middleware para processar JSON no corpo da requisição
app.use(cors());  // Middleware para habilitar CORS

app.use('/api/cobrancas', cobrancaRoutes);  // Rota /api/cobrancas para as cobranças

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

