import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllEntradaProdutosService() {
   const res = await axios.get(`${localServer}/entradas-produtos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getAllEntradaProdutosRecebidosService() {
   const res = await axios.get(`${localServer}/entradas-produtos/recebidas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getAllEntradaProdutosCanceladasService() {
   const res = await axios.get(`${localServer}/entradas-produtos/canceladas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

export async function getEntradaProdutoByIdService(id) {
   const res = await axios.get(`${localServer}/entradas-produtos/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
}

// Itens de Entrada
export async function getAllEntradaProdutosItensByEntradaIdService(idEntrada) {
   const res = await axios.get(`${localServer}/entradas-produtos/${idEntrada}/itens`, {
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
export async function createEntradaProdutoService(body) {
   const res = await axios.post(`${localServer}/entradas-produtos`, body, {
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
export async function updateEntradaProdutoStatusService(id, newStatus) {
   const res = await axios.patch(`${localServer}/entradas-produtos/${id}/status`, { status: newStatus }, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
   });
   return res;
   
}