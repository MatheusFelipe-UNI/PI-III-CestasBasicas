import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";
import { LoteProdutoProvider } from "../../Context/LoteProdutosContext";

export function LotesProdutos() {
   return(
      <LoteProdutoProvider>
         <MainLayout title={"Lotes Produtos"}>
            <Outlet/>
         </MainLayout>
      </LoteProdutoProvider>
   )
}