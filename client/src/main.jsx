import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';

// Páginas
import App from './App.jsx';
import { Home } from './Pages/Home.jsx';
// Aba Produtos
import { Produtos } from './Pages/Produtos/Produtos.jsx';
import { ProdutosEntrada } from './Pages/Produtos/ProdutosEntrada.jsx';
// Aba Cestas
import { Cestas } from './Pages/Cestas/Cestas.jsx';
import { CestasVendas } from './Pages/Cestas/CestasVendas.jsx';

import { Fornecedores } from './Pages/Fornecedores/Fornecedores.jsx';
import { Clientes } from './Pages/Clientes/Clientes.jsx';
import { Usuario } from './Pages/Usuario/Usuario.jsx';
import { Administrador } from './Pages/Administrador/Administrador.jsx';
import { ProdutosMain } from './Components/MainPage/Produtos/ProdutosMain.jsx';
import { LotesProdutos } from './Pages/LotesProdutos/LotesProdutos.jsx';
import { ProdutosEntradaMain } from './Components/MainPage/ProdutosEntrada/ProdutosEntradaMain.jsx';
import { FornecedoresMain } from './Components/MainPage/Fornecedores/FornecedoresMain.jsx';
import { ClientesMain } from './Components/MainPage/Clientes/ClientesMain.jsx';
import { CestasMain } from './Components/MainPage/Cestas/CestasMain.jsx';
import { CestasVendasMain } from './Components/MainPage/CestasVendas/CestasVendasMain.jsx';
import { CestasVendasRegisterSub } from './Components/SubPages/CestasVendas/CestasVendasRegister/CestasVendasRegisterSub.jsx';
import { CestasVendasPendentesSub } from './Components/SubPages/CestasVendas/CestasVendasPendentes/CestasVendasPendentesSub.jsx';
import { CestasVendasConcluidasSub } from './Components/SubPages/CestasVendas/CestasVendasConcluidas/CestasVendasConcluidasSub.jsx';
import { CestasVendasCanceladasSub } from './Components/SubPages/CestasVendas/CestasVendasCanceladas/CestasVendasCanceladasSub.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      //Home
      {
        path: "/",
        element: <Home/>
      },
      //Aba Produtos
      {
        path: "/produtos",
        element: <Produtos/>,
        children: [
          {
            index: true,
            element: <ProdutosMain/>
          },
        ]
      },
      {
        path: "/produtos/:id/lotes",
        element: <LotesProdutos/>,
        children: [
          {
            index: true,
            element: <h1>Lotes Produtos Main</h1>
          }
        ]
      },
      {
        path: "/produtos/entrada",
        element: <ProdutosEntrada/>,
        children: [
          {
            index: true,
            element: <ProdutosEntradaMain/>
          }
        ]
      },
      // Aba Cestas
      {
        path: "/cestas",
        element: <Cestas/>,
        children: [
          {
            index: true,
            element: <CestasMain/>
          }
        ]
      },
      {
        path: "/cestas/vendas",
        element: <CestasVendas/>,
        children: [
          {
            element: <CestasVendasMain/>,
            children: [
              {
                index: true,
                element: <CestasVendasRegisterSub/>
              },
              {
                path: "pendentes",
                element: <CestasVendasPendentesSub/>
              },
              {
                path: "concluidas",
                element: <CestasVendasConcluidasSub/>
              },
              {
                path: "canceladas",
                element: <CestasVendasCanceladasSub/>
              }
            ]
          }
        ]
      },
      {
        path: "/fornecedores",
        element: <Fornecedores/>,
        children: [
          {
            index: true,
            element: <FornecedoresMain/>
          }
        ]
      },
      {
        path: "/clientes",
        element: <Clientes/>,
        children: [
          {
            index: true,
            element: <ClientesMain/>
          }
        ]
      },
      {
        path: "/usuario",
        element: <Usuario/>,
        children: [
          {
            index: true,
            element: <h1>Usuario main</h1>
          }
        ]
      },
      {
        path: "/admin",
        element: <Administrador/>,
        children: [
          {
            index: true,
            element: <h1>Admin Main</h1>
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
