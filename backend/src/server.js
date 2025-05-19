// backend > src > server.js
require('dotenv').config();  // Carregar variáveis de ambiente

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');  // Exemplo com Supabase

// Configurar o cliente do Supabase com as variáveis de ambiente
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
