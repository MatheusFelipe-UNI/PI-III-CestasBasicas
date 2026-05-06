import { Navigate } from "react-router";
import Cookies from "js-cookie";
import { useAlert } from "../../Context/AlertContext";
import { getNecessaryInfoUser, logoutService } from "../../services/user.service";
import { useEffect } from "react";
import localforage from "localforage";

export function ValidateLogin({children}) {
   const token = Cookies.get("token");
   const { showErrorAlert } = useAlert();

   const getLoggedUser = async () => {
      try {
         const res = await getNecessaryInfoUser();
         if(res.data) {
            const { status } = res.data;
            if(String(status).toUpperCase() !== "ATIVO") {
               showErrorAlert({
                  title: "Usuário INATIVO",
                  message: "O seu usuário não está mais ativo!"
               })
               await logoutService();
               return <Navigate to={"/auth"}/>
            }
         }
      } catch (error) {
         console.log(error);
      }
   }

   const clearLastUserData = async () => {
      try {
         await localforage.removeItem("user");
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if(token) {
         getLoggedUser();
      
      } else {
         clearLastUserData();
      }
      
   }, [token])

   if(!token) {
      return <Navigate to={"/auth"}/>
   }

   return children;
}