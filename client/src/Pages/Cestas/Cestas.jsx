import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";
import { CestaProvider } from "../../Context/CestaContext";

export function Cestas() {
   return(
      <CestaProvider>
         <MainLayout title={"Cestas"}>
            <Outlet/>
         </MainLayout>
      </CestaProvider>
   )
}