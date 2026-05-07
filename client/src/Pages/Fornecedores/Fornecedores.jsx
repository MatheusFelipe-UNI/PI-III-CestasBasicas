import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";
import { FornecedorProvider } from "../../Context/FornecedoresContext";

export function Fornecedores() {
   return(
      <FornecedorProvider>
         <MainLayout title={"Fornecedores"}>
            <Outlet/>
         </MainLayout>
      </FornecedorProvider>
   )
}