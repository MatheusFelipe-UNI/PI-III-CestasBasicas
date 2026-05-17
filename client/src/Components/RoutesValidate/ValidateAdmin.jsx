import { Navigate } from "react-router";
import { useUser } from "../../Context/UserContext";
import { getNecessaryInfoUser } from "../../Services/user.service";
import { useEffect } from "react";
import { useEffectEvent } from "react";

export function ValidateAdmin({children}) {
   const {user, setUser} = useUser();

   const getUserinfo = async () => {
      try {
         const res = await getNecessaryInfoUser();
         const { nivel_acesso } = res.data;
         if(nivel_acesso !== nivel_acesso) {
            setUser({...user, nivel_acesso});
         }
      } catch (error) {
         console.log(error);
      }
   }

   const onGetUserInfo = useEffectEvent(() => getUserinfo());

   useEffect(() => {
      onGetUserInfo();
   }, [])

   if(user?.nivel_acesso > 1) {
      return <Navigate to={"/"}/>
   }

   return children;
}