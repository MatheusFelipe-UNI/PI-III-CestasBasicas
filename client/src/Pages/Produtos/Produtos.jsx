import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";
import { ProdutoProvider } from "../../Context/ProdutosContext";

export function Produtos() {
   return(
      <ProdutoProvider>
         <MainLayout title={"Produtos"}>
            <Outlet/>
         </MainLayout>
      </ProdutoProvider>
   )
}