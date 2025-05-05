// import express from "express";
// import cors from "cors";
// //import routes from "./routes/index.js"; // Agora o caminho está correto
// import CobrancasRoutes from "./routes/cobrancasRoutes.js"; // Importando as rotas de cobranças

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// app.use("/api/cobrancas", CobrancasRoutes);

// app.listen(PORT, () => {
//   console.log(`Servidor backend rodando em http://localhost:${PORT}`);
// });
// backend/src/server.js
import express from "express";
import cors from "cors";
import cobrancasRouter from "./routes/cobrancasRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Configurações básicas
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/cobrancas", cobrancasRouter);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});