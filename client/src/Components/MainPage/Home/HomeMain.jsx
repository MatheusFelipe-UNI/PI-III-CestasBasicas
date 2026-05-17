import { CardShortCut } from "../../Cards/CardShortCut/CardShortCut"

export function HomeMain() {
   const shortCutCollection = [
      {
         id: 1,
         title: "Entradas de Produtos",
         path: "/produtos/entrada",
         min_nivel_acesso: 2
      },
      {
         id: 2,
         title: "Visualizar Cestas",
         path: "/cestas",
         min_nivel_acesso: 2
      },
      {
         id: 3,
         title: "Cadastro de Vendas de Cestas",
         path: "/cestas/vendas",
         min_nivel_acesso: 2          
      },
      {
         id: 4,
         title: "Vendas Pendentes",
         path: "/cestas/vendas/pendentes",
         min_nivel_acesso: 2
      },
      {
         id: 5,
         title: "Vendas Concluidas",
         path: "/cestas/vendas/concluidas",
         min_nivel_acesso: 2
      }
   ]

   const nivelAcessoExcludesData = {
      1: [],
      2: [],
   }

   return(
      <CardShortCut shortCutCollection={shortCutCollection} nivelAcessoExcludesData={nivelAcessoExcludesData}/>
   )
}