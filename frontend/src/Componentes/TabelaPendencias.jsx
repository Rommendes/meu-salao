
import React from "react";

function TabelaPendencias({ clientesComDebito, onEnviarCobranca }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Cliente</th>
            <th className="border border-gray-300 px-4 py-2">Telefone</th>
            <th className="border border-gray-300 px-4 py-2">Serviço</th>
            <th className="border border-gray-300 px-4 py-2">Pagamento</th>
            <th className="border border-gray-300 px-4 py-2">Cobrança</th>
          </tr>
        </thead>
        <tbody>
          {clientesComDebito
            .filter((cliente) => cliente.pagamento === "Não pagou") // Filtra só quem não pagou
            .map((cliente, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{cliente.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{cliente.telefone}</td>
              <td className="border border-gray-300 px-4 py-2">{cliente.servico}</td>
              <td className="border border-gray-300 px-4 py-2">{cliente.pagamento}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => onEnviarCobranca(cliente)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition"
                >
                  Enviar cobrança
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaPendencias;
