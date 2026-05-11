import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";
import { VendaCestaProvider } from "../../Context/VendaCestaContext";

export function CestasVendas(){
   return (
      <VendaCestaProvider>
         <MainLayout title={"Vendas de Cestas"}>
            <Outlet/>
         </MainLayout>
      </VendaCestaProvider>
   )
}