import { createContext, useContext, useEffect, useState } from "react";
import localforage from "localforage";
import Cookies from "js-cookie";
import { getNecessaryInfoUser } from "../Services/user.service";
import { useEffectEvent } from "react";

const UserContext = createContext(null);

export function UserProvider({children}) {
   const [user, setUser] = useState();

   const getUserInfo = async () => {
      try {
         const token = Cookies.get("token");
         if(!token) {
            return 
         }
         const userData = await localforage.getItem("user");
         if(token && (!userData || Object.keys(userData).length === 0)) {
            const res = await getNecessaryInfoUser();
            const { usuario, nivel_acesso } = res.data;
            await localforage.setItem("user", { usuario, nivel_acesso });
            setUser({ usuario, nivel_acesso });
         } else {
            setUser(userData);
         }
          

      } catch (error) {
         console.log(error);
      }
   }

   const onGetUserInfo = useEffectEvent(() => getUserInfo())

   useEffect(() => {
      onGetUserInfo();
   }, []);

   return(
      <UserContext.Provider value={{user, setUser}}>
         {children}
      </UserContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);