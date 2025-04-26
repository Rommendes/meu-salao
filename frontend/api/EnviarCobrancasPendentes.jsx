import React, { useEffect, useState } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react";
import { supabase } from "../src/supabaseClient";

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

    try {
      const resposta = await axios.post("/api/enviar-cobrancas", {
        nome: cliente.nome,
        telefone: cliente.telefone,
        valor: valor,
      });

      if (resposta.status === 200) {
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
                        ? "bg-primary cursor-not-allowed"
                        : "bg-secondary hover:bg-secondary-dark"
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
