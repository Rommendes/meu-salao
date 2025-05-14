// backend > src > server.js
const express = require('express');
const cors = require('cors');
const enviarCobrancas = require('./api/enviarCobrancas');  // Importação com require

const app = express();
app.use(express.json());
app.use(cors());

// Usar as rotas de cobranças
app.use('/api/cobrancas', enviarCobrancas);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


