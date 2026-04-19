import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import localforage from "localforage";
import Cookies from "js-cookie";
// import { getNecessaryInfoUser } from "../services/user.service";

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
            // const res = await getNecessaryInfoUser();
            // const { user, nivel_acesso } = res.data;
            // await localforage.setItem("user", { user, nivel_acesso });
            // setUser({ user, nivel_acesso });
         } else {
            setUser(userData);
         }
          

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getUserInfo();
   }, []);

   return(
      <UserContext.Provider value={{user, setUser}}>
         {children}
      </UserContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
   children: PropTypes.oneOfType([
               PropTypes.element,
               PropTypes.arrayOf(PropTypes.element)
   ]),
}