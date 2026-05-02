import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";

export function Usuario() {
   return(
      <MainLayout title={"Usuário"}>
         <Outlet/>
      </MainLayout>
   )
}