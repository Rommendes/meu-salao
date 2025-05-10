

import React, { useEffect, useState } from "react";
import BotaoEnviarCobranca from "../Componentes/BotaoEnviarCobranca.jsx";
import { getAgendamentosPendentes } from "../api/supabaseClient.js"; 
import formatarTelefoneExibicao from "../Componentes/Utilitarios/formatarTelefone.js";
export default function EnviarCobrancasPendentes() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [statusEnvio, setStatusEnvio] = useState({});

  useEffect(() => {
    async function carregarAgendamentos() {
      const resultado = await getAgendamentosPendentes(); // busca do supabase
      setAgendamentos(resultado);
    }

    carregarAgendamentos();
  }, []);

  const atualizarStatus = (id, status) => {
    setStatusEnvio((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cobranças Pendentes</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nome</th>
            <th className="border p-2">Telefone</th>
            <th className="border p-2">Valor</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
  <tr key={agendamento.id}>
    <td>{agendamento.clientes?.nome || "Sem nome"}</td>
    <td>{formatarTelefoneExibicao(agendamento.clientes?.telefone) || "Sem telefone"}</td>
    <td>{agendamento.valor}</td>
    <td>{agendamento.pagamento}</td>
    <td>
      <BotaoEnviarCobranca
        agendamento={agendamento}
        cliente={agendamento.clientes} // adicione esta linha
        atualizarStatus={atualizarStatus}
        status={statusEnvio[agendamento.id]}
      />

    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}
