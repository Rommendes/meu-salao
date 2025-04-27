import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import TabelaPendencias from "../Componentes/TabelaPendencias"

function EnviarCobrancasPendentes() {
  const [clientesComDebito, setClientesComDebito] = useState([]);

  useEffect(() => {
    async function carregarClientesComDebito() {
      const { data, error } = await supabase
        .from('agendamentos')
        .select(`
          id,
          servico,
          pagamento,
          cliente_id,
          clientes ( nome, telefone )
        `)
        .eq('pagamento', 'Não pagou');
  
      if (error) {
        console.error('Erro ao buscar clientes:', error);
      } else {
        const clientesComDados = data.map(agendamento => ({
          nome: agendamento.clientes?.nome || 'Sem nome',
          telefone: agendamento.clientes?.telefone || 'Sem telefone',
          servico: agendamento.servico,
          pagamento: agendamento.pagamento,
        }));
  
        setClientesComDebito(clientesComDados);
      }
    }
  
    carregarClientesComDebito();
  }, []);
  

  async function enviarCobranca(cliente) {
    const mensagem = `Olá ${cliente.nome}, tudo bem? Notamos que seu pagamento referente ao serviço "${cliente.servico}" ainda está pendente. Poderia verificar por favor? Obrigado(a)! 🙏`;

    try {
      const response = await fetch("http://localhost:3000/api/enviar-cobrancas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeroTelefone: cliente.telefone,
          mensagem,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Cobrança enviada:", data.message);
      } else {
        console.error("Erro ao enviar cobrança:", data.error);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Clientes com Débito</h1>
      <TabelaPendencias clientesComDebito={clientesComDebito} onEnviarCobranca={enviarCobranca} />
    </div>
  );
}

export default EnviarCobrancasPendentes;

