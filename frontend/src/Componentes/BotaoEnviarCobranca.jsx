// src/pages/CobrancasPendentes.jsx

import React from "react";
import { SendHorizonal } from "lucide-react";

const BotaoEnviarCobranca = ({ enviado, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={enviado}
      className={`px-3 py-1 rounded flex items-center gap-1 text-white ${
        enviado
          ? "bg-blue-500 hover:bg-blue-600 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      <SendHorizonal size={16} />
      {enviado ? "Enviado" : "Enviar"}
    </button>
  );
};

export default BotaoEnviarCobranca;
// src/Componentes/BotaoEnviarCobranca.jsx