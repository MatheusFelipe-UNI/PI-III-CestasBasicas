import { createContext, useContext, useEffect, useEffectEvent, useState } from "react";
import { getAllDefaultUsersService } from "../services/admin.service";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
   const [allUsers, setAllUsers] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const getAllUsers = async () => {
      const res = await getAllDefaultUsersService();
      setAllUsers(res.data);
      setIsLoading(false);
   };

   const init = async () => {
      try {
         await getAllUsers();
      } catch (error) {
         console.log(error);
      }
   };

   const onInit = useEffectEvent(() => init());

   useEffect(() => {
      onInit();
   }, []);

   return (
      <AdminContext.Provider value={{ allUsers, setAllUsers, getAllUsers, isLoading, setIsLoading }}>
         {children}
      </AdminContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => useContext(AdminContext);
