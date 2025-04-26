import React, { useEffect, useState } from "react";
import { supabase } from "../frontend/src/supabaseClient";
import { SendHorizonal } from "lucide-react";

const EnviarCobrancasPendentes = () => {
  const [pendentes, setPendentes] = useState([]);
  const [statusEnvio, setStatusEnvio] = useState({});

  useEffect(() => {
    const buscarPendencias = async () => {
      const { data, error } = await supabase
        .from("agendamentos")
        .select(`
          id,
          valor,
          pagamento,
          cliente:clientes (
            nome,
            telefone
          )
        `)
        .eq("pagamento", "Não pagou");

      if (error) {
        console.error("Erro ao buscar agendamentos pendentes:", error);
      } else {
        setPendentes(data);
      }
    };

    buscarPendencias();
  }, []);

  const enviarCobranca = async (agendamento) => {
    const { cliente, valor } = agendamento;

    if (!cliente?.telefone || !cliente?.nome) {
      alert("Telefone ou nome do cliente ausente.");
      return;
    }

    const numero = cliente.telefone.replace(/\D/g, "");
    const mensagem = `Olá ${cliente.nome}, notamos que há um pagamento pendente no valor de R$ ${valor} referente ao seu atendimento. Por favor, entre em contato para regularizar. Obrigada! 💇‍♀️`;

    const url = `https://api.callmebot.com/whatsapp.php?phone=55${numero}&text=${encodeURIComponent(
      mensagem
    )}&apikey=8996545`;

    try {
      const resposta = await fetch(url);
      if (resposta.ok) {
        setStatusEnvio((prev) => ({ ...prev, [agendamento.id]: "✅ Enviado" }));
      } else {
        setStatusEnvio((prev) => ({ ...prev, [agendamento.id]: "❌ Erro" }));
      }
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setStatusEnvio((prev) => ({ ...prev, [agendamento.id]: "❌ Erro" }));
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cobranças Pendentes</h2>
      {pendentes.length === 0 ? (
        <p className="text-gray-500">Nenhuma cobrança pendente encontrada.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nome</th>
              <th className="border p-2">Telefone</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {pendentes.map((agendamento) => (
              <tr key={agendamento.id} className="text-center">
                <td className="border p-2">{agendamento.cliente?.nome || "—"}</td>
                <td className="border p-2">{agendamento.cliente?.telefone || "—"}</td>
                <td className="border p-2">R$ {agendamento.valor}</td>
                <td className="border p-2">{statusEnvio[agendamento.id] || "Pendente"}</td>
                <td className="border p-2">
                  
                 
                <button
                  onClick={() => enviarCobranca(agendamento)}
                  disabled={statusEnvio[agendamento.id] === "✅ Enviado"}
                  className={`px-3 py-1 rounded flex items-center gap-1 text-white ${
                    statusEnvio[agendamento.id] === "✅ Enviado"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  <SendHorizonal size={16} />
                  {statusEnvio[agendamento.id] === "✅ Enviado" ? "Enviado" : "Enviar"}
                </button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnviarCobrancasPendentes;
