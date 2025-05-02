
import React from "react";
import { SendHorizonal, Loader } from "lucide-react"; // Importar um icone de loading também!

const BotaoEnviarCobranca = ({ enviado, enviando, onClick }) => {
  const enviarMensagem = () => { 
  const msg = encodeURIComponent(
    `Olá ${nome}, você possui um valor pendente de R$ ${valor}. Por favor, entre em contato para regularizar.`
  );
  const url = `https://api.callmebot.com/whatsapp.php?phone=55${telefone}&text=${msg}&apikey=SUA_API_KEY`;

  window.open(url, "_blank");
};


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
