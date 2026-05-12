import { createContext, useContext, useEffect, useEffectEvent, useMemo, useState } from "react";
import { getScreenViewStatusByKey, setScreenViewStatusByKey } from "../utils/ViewStatusUtil";
import { useSearchParams } from "react-router";
import {
   getAllEntradaProdutosCanceladasService,
   getAllEntradaProdutosRecebidosService,
   updateEntradaProdutoStatusService,
} from "../Services/entradaProdutos.service";
import { customSearchFilterEntradaProdutos } from "../utils/SearchFilterUtil";

const EntradaProdutoContext = createContext(null);

export function EntradaProdutoProvider({ children }) {
   const [entradaProdutos, setEntradaProdutos] = useState();
   const [filteredEntradaProdutos, setFilteredEntradaProdutos] = useState();
   const [currViewStatus, setCurrViewStatus] = useState(
      getScreenViewStatusByKey("entradaProdutos") || "RECEBIDO",
   );

   const [isLoading, setIsLoading] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const searchValueMemo = useMemo(() => searchParams.get("search"), [searchParams]);

   const changeCurrViewStatus = (newViewStatus) => {
      setCurrViewStatus(newViewStatus);
      setScreenViewStatusByKey("entradaProdutos", newViewStatus);
   };

   const getAllEntradaProdutos = async (viewStatus) => {
      let res;
      if (!isLoading) {
         setIsLoading(true);
      }
      res = await getAllEntradaProdutosRecebidosService();

      setEntradaProdutos(res.data);
      setFilteredEntradaProdutos(res.data);
      setIsLoading(false);
   };

   const loadFilteredEntradaProdutos = (entradaProdutos, searchValue) => {
      const fieldsForSearch = [
         "nome_produto",
         "nome_fornecedor",
         "tipo_unidade",
         "valor_unitario",
         "qtd_disponivel",
         "is_vencido",
      ];

      if (entradaProdutos && Array.isArray(entradaProdutos)) {
         const filteredData = customSearchFilterEntradaProdutos(
            entradaProdutos,
            searchValue,
            fieldsForSearch,
         );
         setFilteredEntradaProdutos(filteredData);
      }
   };

   const defineSearchParams = (searchValue) => {
      if (searchValue || searchValueMemo) {
         setSearchParams({ search: searchValue });
      }
   };

   const updateEntradaProdutoStatus = async (id, newEntradaProdutoStatus) => {
      const res = await updateEntradaProdutoStatusService(id, newEntradaProdutoStatus);

      if (res.data.status === "success" || res.status === 200) {
         await getAllEntradaProdutos(currViewStatus);
         return true;
      }
   };

   const init = async () => {
      try {
         if (currViewStatus) {
            await getAllEntradaProdutos(currViewStatus);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const onInit = useEffectEvent(() => init());

   const onGetAllEntradaProdutos = useEffectEvent((currViewStatus) =>
      getAllEntradaProdutos(currViewStatus),
   );
   const onLoadFilteredEntradaProdutos = useEffectEvent((entradaProdutos, searchValue) =>
      loadFilteredEntradaProdutos(entradaProdutos, searchValue),
   );

   useEffect(() => {
      onInit();
   }, []);

   useEffect(() => {
      onLoadFilteredEntradaProdutos(entradaProdutos, searchValueMemo);
   }, [entradaProdutos, searchValueMemo]);

   useEffect(() => {
      onGetAllEntradaProdutos(currViewStatus);
   }, [currViewStatus]);

   return (
      <EntradaProdutoContext.Provider
         value={{
            entradaProdutos,
            filteredEntradaProdutos,
            isLoading,
            currViewStatus,
            changeCurrViewStatus,
            getAllEntradaProdutos,
            updateEntradaProdutoStatus,
            searchValueMemo,
            defineSearchParams,
         }}
      >
         {children}
      </EntradaProdutoContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEntradaProduto = () => useContext(EntradaProdutoContext);
