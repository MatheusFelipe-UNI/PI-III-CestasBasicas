import { Outlet } from "react-router";
import MainLayout from "../../Components/layout/MainLayout";
import { AdminProvider } from "../../Context/AdminContext";
import { ValidateAdmin } from "../../Components/RoutesValidate/ValidateAdmin";

export function Administrador() {
   return(
      <ValidateAdmin>
         <AdminProvider>
            <MainLayout title={"Administrador"}>
               <Outlet/>
            </MainLayout>
         </AdminProvider>
      </ValidateAdmin>
   )
}