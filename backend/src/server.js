import dotenv from 'dotenv';
dotenv.config();  // Carregar variáveis de ambiente

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);

import express from 'express';
import cors from 'cors';
import cobrancaRoutes from './routes/cobrancasRoutes.js';  // Certifique-se de que está correto

const app = express();

// Usar middleware
app.use(express.json());
app.use(cors());

app.use('/api/cobrancas', cobrancaRoutes);  // A rota /api/cobrancas vai usar a rota do cobrancaRoutes.js

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

