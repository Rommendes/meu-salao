import React, { useEffect, useState } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react";
import { supabase } from "../../src/api/supabaseClient";
import BotaoEnviarCobranca from "../Componentes/BotaoEnviarCobranca";
import Header from "../Componentes/Header/Header";

const EnviarCobrancasPendentes = () => {
  const [pendentes, setPendentes] = useState([]);
  const [statusEnvio, setStatusEnvio] = useState({});
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const buscarPendencias = async () => {
      setCarregando(true);
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
      setCarregando(false);
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
        valor,
      });

      if (resposta.status === 200) {
        setStatusEnvio((prev) => ({ ...prev, [agendamento.id]: "✅ Enviado" }));
      } else {
        setStatusEnvio((prev) => ({ ...prev, [agendamento.id]: "❌ Erro" }));
      }
    } catch (err) {
      console.error("Erro ao enviar cobrança:", err.message);
      setStatusEnvio((prev) => ({ ...prev, [agendamento.id]: "❌ Erro" }));
    }
  };
  
  const enviarTodasCobrancas = async () => {
    for (const agendamento of pendentes) {
      if (statusEnvio[agendamento.id] !== "✅ Enviado") {
        await enviarCobranca(agendamento);
      }
    }
  };

  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Header title="Cobranças Pendentes" />
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Enviar Cobranças Pendentes</h2>

      {carregando ? (
        <p className="text-center text-gray-500">Carregando pendências...</p>
      ) : pendentes.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma cobrança pendente encontrada.</p>
      ) : (
        <>
        <div className="flex justify-center mb-4">
            <button
              onClick={enviarTodasCobrancas}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
            >
              Enviar Todos
            </button>
          </div>

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
              <tr key={agendamento.id} className="text-left">
                <td className="border p-2">{agendamento.cliente?.nome || "—"}</td>
                <td className="border p-2">{agendamento.cliente?.telefone || "—"}</td>
                <td className="border p-2">R$ {agendamento.valor}</td>
                <td className="border p-2">{statusEnvio[agendamento.id] || "Pendente"}</td>
                
                <td className="border p-2">
                <BotaoEnviarCobranca
                  enviado={statusEnvio[agendamento.id] === "✅ Enviado"}
                  onClick={() => enviarCobranca(agendamento)}
                />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
};

export default EnviarCobrancasPendentes;


