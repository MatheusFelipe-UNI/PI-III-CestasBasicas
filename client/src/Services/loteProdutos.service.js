import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;


/* 
==================================
method = GET
==================================
*/
export async function getAllLoteProdutosService() {
   const res = await axios.get(`${localServer}/produtos/lotes`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllActiveLoteProdutosService() {
   const res = await axios.get(`${localServer}/produtos/lotes/ativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllInactiveLoteProdutosService() {
   const res = await axios.get(`${localServer}/produtos/lotes/inativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllActiveLoteProdutosByProdutoIdService(id) {
   const res = await axios.get(`${localServer}/produtos/${id}/lotes/ativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllInactiveLoteProdutosByProdutoIdService(id) {
   const res = await axios.get(`${localServer}/produtos/${id}/lotes/inativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getLoteProdutoByIdService(id) {
   const res = await axios.get(`${localServer}/produtos/lotes/${id}`, {
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
export async function createLoteProdutoService(body) {
   const res = await axios.post(`${localServer}/produtos/lotes`, body, {
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
export async function updateLoteProdutoService(id, body) {
   const res = await axios.patch(`${localServer}/produtos/lotes/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function updateLoteProdutoStatusService(id, newStatus) {
   const res = await axios.patch(`${localServer}/produtos/lotes/${id}/status`, { status: newStatus }, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}