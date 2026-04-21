import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";

export function CestasVendas(){
   return (
      <MainLayout title={"Vendas de Cestas"}>
         <Outlet/>
      </MainLayout>
   )
}