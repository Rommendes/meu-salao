import dotenv from 'dotenv';
dotenv.config();  // Carregar variáveis de ambiente
console.log('Carregando variáveis de ambiente:');
console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);

import express from 'express';
import cors from 'cors';
import cobrancaRoutes from './routes/cobrancasRoutes.js';

const app = express();

// Configurar CORS para permitir apenas requisições do frontend
const corsOptions = {
  origin: 'http://localhost:5173',  // Porta onde o frontend está rodando
};

// Usar o middleware CORS com opções
app.use(cors(corsOptions));  // Aplica a configuração CORS

app.use(express.json());
app.use('/api/cobrancas', cobrancaRoutes);  // A rota /api/cobrancas vai usar a rota do cobrancaRoutes.js

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


