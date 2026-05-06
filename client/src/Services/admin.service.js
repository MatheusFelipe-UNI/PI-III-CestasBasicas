import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllDefaultUsersService() {
   const res = await axios.get(`${localServer}/users/default-users`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

/* 
==================================
method = POST
==================================
*/
export async function registerNewUser(body) {
   const res = await axios.post(`${localServer}/users`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}


/* 
==================================
method = PATCH
==================================
*/
export async function changeStatusUserService(idUser, status) {
   const res = await axios.patch(`${localServer}/users/default-users/${idUser}`, {status}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}
