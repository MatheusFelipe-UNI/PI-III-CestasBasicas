import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";

export function Cestas() {
   return(
      <MainLayout title={"Cestas"}>
         <Outlet/>
      </MainLayout>
   )
}