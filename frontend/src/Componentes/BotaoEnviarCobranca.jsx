// import React from "react";
// import { SendHorizonal } from "lucide-react";

// const BotaoEnviarCobranca = ({ enviado, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={enviado}
//       className={`px-3 py-1 rounded flex items-center gap-1 text-white ${
//         enviado
//           ? "bg-blue-500 hover:bg-blue-600 cursor-not-allowed"
//           : "bg-green-500 hover:bg-green-600"
//       }`}
//     >
//       <SendHorizonal size={16} />
//       {enviado ? "Enviado" : "Enviar"}
//     </button>
//   );
// };

// export default BotaoEnviarCobranca;
import React from "react";
import { SendHorizonal, Loader } from "lucide-react"; // Importar um icone de loading também!

const BotaoEnviarCobranca = ({ enviado, enviando, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={enviado || enviando}
      className={`px-3 py-1 rounded flex items-center gap-1 text-white ${
        enviado
          ? "bg-blue-500 hover:bg-blue-600 cursor-not-allowed"
          : enviando
          ? "bg-yellow-500 hover:bg-yellow-600 cursor-wait"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {enviando ? <Loader size={16} className="animate-spin" /> : <SendHorizonal size={16} />}
      {enviando ? "Enviando..." : enviado ? "Enviado" : "Enviar"}
    </button>
  );
};

export default BotaoEnviarCobranca;
