import React, { useState } from "react";
import { enviarCobranca } from "../services/enviarCobranca";

export default function BotaoEnviarCobrancas({ cliente }) {
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false); // Novo estado para indicar erro visualmente, se quiser

  const handleClick = async () => {
    setEnviando(true);
    setMensagem("");
    setErro(false);

    try {
      const { nome, telefone, valor } = cliente;

      if (!nome || !telefone || !valor) {
        setMensagem("Dados incompletos para envio da cobrança.");
        setErro(true);
        return;
      }

      const response = await enviarCobranca({ nome, telefone, valor });

      setMensagem(response.message || "Cobrança enviada com sucesso!");
    } catch (error) {
      const erroMsg = error.response?.data?.message || "Erro ao enviar cobrança.";
      console.error("Erro detalhado:", error); // 👈 para debug
      setMensagem(erroMsg);
      setErro(true);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <button
        onClick={handleClick}
        disabled={enviando}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {enviando ? "Enviando..." : "Enviar Cobrança"}
      </button>

      {mensagem && (
        <p className={`text-sm ${erro ? "text-red-600" : "text-green-600"}`}>
          {mensagem}
        </p>
      )}
    </div>
  );
}
