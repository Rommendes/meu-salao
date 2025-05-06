// src/routes/cobrancasRoutes.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota de cobranças funcionando!');
});

export default router;
