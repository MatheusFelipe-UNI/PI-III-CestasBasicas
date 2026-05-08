import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllFornecedoresService() {
   const res = await axios.get(`${localServer}/fornecedores`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllActiveFornecedoresService() {
   const res = await axios.get(`${localServer}/fornecedores/ativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}


export async function getAllInactiveFornecedoresService() {
   const res = await axios.get(`${localServer}/fornecedores/inativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getFornecedorByIdService(id) {
   const res = await axios.get(`${localServer}/fornecedores/${id}`, {
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
export async function createFornecedorService(body) {
   const res = await axios.post(`${localServer}/fornecedores`, body, {
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
export async function updateFornecedorService(id, body) {
   const res = await axios.patch(`${localServer}/fornecedores/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function updateFornecedorStatusService(id, newStatus) {

   const res = await axios.patch(`${localServer}/fornecedores/${id}/status`, {status: newStatus}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;   
}