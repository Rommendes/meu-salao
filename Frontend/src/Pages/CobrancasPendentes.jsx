// src/pages/CobrancasPendentes.jsx
import React from "react";
import Header from "../Componentes/Header/Header";
import EnviarCobrancasPendentes from "../Componentes/Cobrancas/EnviarCobrancasPendentes";

const CobrancasPendentes = () => {
  return (
    <div className="p-4">
      <Header />
      <h1 className="text-xl font-bold text-center mb-4 text-primary">Clientes com Pagamento Pendente</h1>
      <EnviarCobrancasPendentes />
    </div>
  );
};

export default CobrancasPendentes;
