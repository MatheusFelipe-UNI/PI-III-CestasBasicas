import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllCestasService() {
   const res = await axios.get(`${localServer}/cestas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getAllActiveCestasService() {
   const res = await axios.get(`${localServer}/cestas/ativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getAllInactiveCestasService() {
   const res = await axios.get(`${localServer}/cestas/inativos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getAllCestaItensByIdCesta(idCesta) {
   const res = await axios.get(`${localServer}/cestas/${idCesta}/itens`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getCestaByIdService(id) {
   const res = await axios.get(`${localServer}/cestas/${id}`, {
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
export async function createCestaService(body) {
   const res = await axios.post(`${localServer}/cestas`, body, {
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
export async function updateCestaService(id, body) {
   const res = await axios.patch(`${localServer}/cestas/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function updateCestaStatusService(id, newStatus) {
   const res = await axios.patch(`${localServer}/cestas/${id}/status`, { status: newStatus }, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}