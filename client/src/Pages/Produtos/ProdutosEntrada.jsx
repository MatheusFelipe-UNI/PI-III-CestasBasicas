import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";

export function ProdutosEntrada() {
   return(
      <MainLayout title={"Entrada de Produtos"}>
         <Outlet/>
      </MainLayout>
   )
}