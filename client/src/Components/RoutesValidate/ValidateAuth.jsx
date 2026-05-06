import { Navigate } from "react-router"
import Cookies from "js-cookie";

export function ValidateAuth({children}) {
   const token = Cookies.get("token");

   if(token) {
      return <Navigate to={"/"}/>
   }

   return children;
}