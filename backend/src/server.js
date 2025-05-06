import express from "express";
import cors from "cors";
import enviarCobrancas from "./api/enviar-cobrancas.js"; // Caminho certo

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/enviar-cobrancas", enviarCobrancas ); // Agora funciona certinho

app.get('/', (req, res) => {
  res.send('Servidor backend funcionando!');
});
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
