import React ,{ useState } from "react"
import {  Routes, Route} from "react-router-dom"
import 'material-icons/iconfont/material-icons.css'
import Login from './Pages/Login'
import Home from "./Pages/Home"
import CadastrarCliente from "./Pages/CadastrarCliente.jsx";
import ListaClientes from "./Pages/ListaClientes.jsx"
import EditarCliente from "./Componentes/EditarCliente/editarCliente.jsx"
import Agenda from "./Pages/Agenda.jsx"
import BuscaCliente from "./Pages/buscaCliente.jsx"
import HistoricoSemanal from "./Pages/HistoricoSemanal.jsx"
import CobrancasPendentes from "./Pages/EnviarCobrancasPendentes.jsx"


function App() {
  
  const [ setIsAuthenticated] = useState(false);
  return (
    

   <div>
    <Routes >
      <Route path="/"element= { <Login setIsAuthenticated={setIsAuthenticated}/> }/>
      <Route path="/busca-cliente" element={<BuscaCliente />} />
      <Route path="/home" element = { <Home/> }/>
      <Route path="/cadastrar-cliente" element= { <CadastrarCliente/> }/>
      <Route path="/lista-clientes" element={ <ListaClientes/> } />
    
      <Route path="/editar-cliente" element={ <EditarCliente/> }/>
      <Route path="/agenda" element= { <Agenda/> }/>
      <Route path="/historico-semanal" element= { <HistoricoSemanal/> }/>
      <Route path="cobrancas" element= { <CobrancasPendentes/> }/>
  
    </Routes>
    </div>
   
  )
}

export default App
