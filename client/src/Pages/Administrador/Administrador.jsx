import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";

export function Administrador() {
   return(
      <MainLayout title={"Administrador"}>
         <Outlet/>
      </MainLayout>
   )
}