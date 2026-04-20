import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";

export function Clientes() {
   return(
      <MainLayout title={"Clientes"}>
         <Outlet/>
      </MainLayout>
   )
}