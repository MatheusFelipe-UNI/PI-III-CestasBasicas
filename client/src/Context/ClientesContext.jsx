import { createContext, useContext, useEffect, useEffectEvent, useMemo, useState } from "react";
import { getScreenViewStatusByKey, setScreenViewStatusByKey } from "../utils/ViewStatusUtil";
import { useSearchParams } from "react-router";
import {
   createClienteService,
   getAllActiveClientesService,
   getAllInactiveClientesService,
   updateClienteService,
   updateClienteStatusService,
} from "../Services/clientes.service";
import { customSearchFilterCliente } from "../utils/SearchFilterUtil";

const ClienteContext = createContext(null);

export function ClienteProvider({ children }) {
   const [clientes, setClientes] = useState();
   const [filteredClientes, setFilteredClientes] = useState();
   const [currViewStatus, setCurrViewStatus] = useState(
      getScreenViewStatusByKey("clientes") || "ATIVO",
   );

   const [isLoading, setIsLoading] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const searchValueMemo = useMemo(() => searchParams.get("search"), [searchParams]);

   // Alteração do viewStatus
   const changeCurrViewStatus = (newViewStatus) => {
      setCurrViewStatus(newViewStatus);
      setScreenViewStatusByKey("clientes", newViewStatus);
   };

   const getAllClientes = async (viewStatus) => {
      let res;
      if (!isLoading) {
         setIsLoading(true);
      }
      if (viewStatus === "ATIVO") {
         res = await getAllActiveClientesService();
      } else {
         res = await getAllInactiveClientesService();
      }

      setClientes(res.data);
      setFilteredClientes(res.data);
      setIsLoading(false);
   };

   const loadFilteredClientes = (clientes, searchValue) => {
      const fieldsForSearch = ["nome_cliente", "telefone", "cpf_cnpj", "tipo_cliente"];
      if (clientes && Array.isArray(clientes)) {
         const filteredData = customSearchFilterCliente(clientes, searchValue, fieldsForSearch);
         setFilteredClientes(filteredData);
      }
   };

   const defineSearchParams = (searchValue) => {
      if (searchValue || searchValueMemo) {
         setSearchParams({ search: searchValue });
      }
   };

   const createCliente = async (clienteData) => {
      const res = await createClienteService(clienteData);
      if (res.data.status === "success" || res.status === 201) {
         await getAllClientes(currViewStatus);
         return true;
      }
   };

   const updateCliente = async (id, newClienteData) => {
      const res = await updateClienteService(id, newClienteData);

      if (res.data.status === "success" || res.status === 200) {
         await getAllClientes(currViewStatus);
         return true;
      }
   };

   const updateClienteStatus = async (id, newClienteStatus) => {
      const res = await updateClienteStatusService(id, newClienteStatus);

      if (res.data.status === "success" || res.status === 200) {
         await getAllClientes(currViewStatus);
         return true;
      }
   };

   const init = async () => {
      try {
         await getAllClientes();
      } catch (error) {
         console.log(error);
      }
   };

   // useEffectEvents
   const onInit = useEffectEvent(() => init());

   const onGetAllClientes = useEffectEvent((currViewStatus) => getAllClientes(currViewStatus));
   const onLoadFilteredClientes = useEffectEvent((clientes, searchValue) =>
      loadFilteredClientes(clientes, searchValue),
   );

   useEffect(() => {
      onInit();
   }, []);

   useEffect(() => {
      onLoadFilteredClientes(clientes, searchValueMemo);
   }, [clientes, searchValueMemo]);

   useEffect(() => {
      onGetAllClientes(currViewStatus);
   }, [currViewStatus]);

   return(
      <ClienteContext.Provider value={{
         clientes,
         filteredClientes,
         isLoading,
         currViewStatus,
         changeCurrViewStatus,
         getAllClientes,
         createCliente,
         updateCliente,
         updateClienteStatus,
         searchValueMemo,
         defineSearchParams
      }}>
         { children }
      </ClienteContext.Provider>
   )

}

export const useCliente = () => useContext(ClienteContext);
