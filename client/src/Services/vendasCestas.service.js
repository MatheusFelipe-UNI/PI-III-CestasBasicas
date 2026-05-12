import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;


/* 
==================================
method = GET
==================================
*/
export async function getAllVendasCestasService() {
   const res = await axios.get(`${localServer}/vendas-cestas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getAllVendasCestasPendentesService() {
   const res = await axios.get(`${localServer}/vendas-cestas/pendentes`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getAllVendasCestasConcluidasService() {
   const res = await axios.get(`${localServer}/vendas-cestas/concluidas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getAllVendasCestasCanceladasService() {
   const res = await axios.get(`${localServer}/vendas-cestas/canceladas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getVendaCestaByIdService(id) {
   const res = await axios.get(`${localServer}/vendas-cestas/${id}`, {
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
export async function createVendaCestaService(body) {
   const res = await axios.post(`${localServer}/vendas-cestas`, body, {
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
export async function updateVendaCestaService(id, body) {
   const res = await axios.patch(`${localServer}/vendas-cestas/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function updateVendaCestaStatusService(id, newStatus) {
   const res = await axios.patch(`${localServer}/vendas-cestas/${id}/status`, { status: newStatus }, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}


/* 
==================================
method = DELETE
==================================
*/
export async function deleteVendaCestaService(id) {
   const res = await axios.delete(`${localServer}/vendas-cestas/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}