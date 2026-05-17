import { Outlet } from "react-router";
import MainLayout from "../Components/layout/MainLayout";
import { UserProvider } from "../Context/UserContext";

export function Home() {
   return (
      <UserProvider>
         <MainLayout title={"Home - Atalhos"}>
            <Outlet/>
         </MainLayout>
      </UserProvider>
   )
}