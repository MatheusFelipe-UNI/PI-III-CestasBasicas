import axios from "axios";
import Cookies from "js-cookie";
import localforage from "localforage";

const localServer = import.meta.env.VITE_SERVER_URL;

export async function loginService(body) {
   const res = await axios.post(`${localServer}/auth`, body);
   return res;
}

export async function logoutService() {
   Cookies.remove("token");
   await localforage.removeItem("user");
}

export async function getNecessaryInfoUser() {
   const res = await axios.get(`${localServer}/users/logged`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function updatePasswordUserService(currPassword, newPassword) {
   const res = await axios.patch(`${localServer}/users/password`, {currPassword, newPassword}, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

// Consultas para o primeiro registro de usuário
export async function registerFirstUserService(body) {
   const res = await axios.post(`${localServer}/users/first/register`, body);
   return res;
}

// IMPLEMENTAR DEPOIS NO BACKEND
export async function getTotalUsersForFirstRegister() {
   const res = await axios.get(`${localServer}/users/first/total-registered`);
   return res;
}