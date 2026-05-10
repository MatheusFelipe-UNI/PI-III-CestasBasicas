import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";
import { EntradaProdutoProvider } from "../../Context/EntradaProdutosContext";

export function ProdutosEntrada() {
   return(
      <EntradaProdutoProvider>
         <MainLayout title={"Entrada de Produtos"}>
            <Outlet/>
         </MainLayout>
      </EntradaProdutoProvider>
   )
}