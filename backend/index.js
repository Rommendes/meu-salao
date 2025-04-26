/* eslint-env node */
/* eslint-env node */
import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import enviarCobrancasRoute  from './routes/enviarCobrancas.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota para envio de mensagens
app.use('/api/enviar-cobrancas', enviarCobrancasRoute);

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});

console.log('🔑 API Key:', process.env.CALLMEBOT_APIKEY);


