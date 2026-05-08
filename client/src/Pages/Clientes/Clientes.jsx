import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";
import { ClienteProvider } from "../../Context/ClientesContext";

export function Clientes() {
   return(
      <ClienteProvider>
         <MainLayout title={"Clientes"}>
            <Outlet/>
         </MainLayout>
      </ClienteProvider>
   )
}