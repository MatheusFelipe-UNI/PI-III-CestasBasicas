import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;


/* 
==================================
method = GET
==================================
*/
export async function getAllProdutosService() {
   const res = await axios.get(`${localServer}/produtos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}