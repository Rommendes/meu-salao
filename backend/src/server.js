import express from 'express';
import cors from 'cors';
import cobrancasRoutes from './routes/cobrancasRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/cobrancas', cobrancasRoutes);

// Inicialização
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
