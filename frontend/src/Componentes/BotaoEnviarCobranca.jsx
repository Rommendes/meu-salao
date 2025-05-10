import { useState } from "react";
import { enviarCobranca } from "../api/cobrancaApi"; // Ajuste o caminho conforme necessário

export default function BotaoEnviarCobranca({ agendamento, atualizarStatus, status }) {
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleClick = async () => {
    setEnviando(true);
    setMensagem("");
    setErro(false);

    try {
      const { nome, telefone } = agendamento.clientes || {};
      const { valor } = agendamento;

      if (!nome || !telefone || !valor) {
        setMensagem("Dados incompletos para envio da cobrança.");
        setErro(true);
        return;
      }

      const response = await enviarCobranca({ nome, telefone, valor });

      setMensagem(response.message || "Cobrança enviada com sucesso!");
      atualizarStatus(agendamento.id, "enviado");
    } catch (error) {
      const erroMsg = error.response?.data?.message || "Erro ao enviar cobrança.";
      console.error("Erro detalhado:", error);
      setMensagem(erroMsg);
      setErro(true);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        className={`px-3 py-1 rounded ${
          enviando ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white text-sm`}
        onClick={handleClick}
        disabled={enviando || status === "enviado"}
      >
        {status === "enviado" ? "Enviado" : enviando ? "Enviando..." : "Enviar cobrança"}
      </button>
      {mensagem && (
        <p className={`text-xs ${erro ? "text-red-600" : "text-green-600"}`}>{mensagem}</p>
      )}
    </div>
  );
}
