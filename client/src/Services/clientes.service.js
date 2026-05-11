import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllClientesService() {
   const res = await axios.get(`${localServer}/clientes`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllActiveClientesService() {
   const res = await axios.get(`${localServer}/clientes/ativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllInactiveClientesService() {
   const res = await axios.get(`${localServer}/clientes/inativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;   
}

export async function getAllClientesForSelectService() {
   const res = await axios.get(`${localServer}/clientes/select-options`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getClienteByIdService(id) {
   const res = await axios.get(`${localServer}/clientes/${id}`, {
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
export async function createClienteService(body) {
   const res = await axios.post(`${localServer}/clientes`, body, {
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
export async function updateClienteService(id, body) {
   const res = await axios.patch(`${localServer}/clientes/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function updateClienteStatusService(id, newStatus) {
   const res = await axios.patch(`${localServer}/clientes/${id}/status`, { status: newStatus }, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}