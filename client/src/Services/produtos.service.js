import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;


/* 
==================================
method = GET
==================================
*/
export async function getAllProdutosService() {
   const res = await axios.get(`${localServer}/produtos/geral`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllActiveProdutosService() {
   const res = await axios.get(`${localServer}/produtos/geral/ativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllInactiveProdutosService() {
   const res = await axios.get(`${localServer}/produtos/geral/inativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getProdutoByIdService(id) {
   const res = await axios.get(`${localServer}/produtos/geral/${id}`, {
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
export async function createProdutoService(body) {
   const res = await axios.post(`${localServer}/produtos/geral`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}


/* 
==================================
method = PATCH
==================================
*/
export async function updateProdutoService(id, body) {
   const res = await axios.patch(`${localServer}/produtos/geral/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function updateProdutoStatusService(id, newStatus) {
   const res = await axios.patch(`${localServer}/produtos/geral/${id}/status`, { status: newStatus }, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}