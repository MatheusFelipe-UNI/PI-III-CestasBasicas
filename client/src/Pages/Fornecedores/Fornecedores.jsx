import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";

export function Fornecedores() {
   return(
      <MainLayout title={"Fornecedores"}>
         <Outlet/>
      </MainLayout>
   )
}