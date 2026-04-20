import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";

export function Produtos() {
   return(
      <MainLayout title={"Produtos"}>
         <Outlet/>
      </MainLayout>
   )
}