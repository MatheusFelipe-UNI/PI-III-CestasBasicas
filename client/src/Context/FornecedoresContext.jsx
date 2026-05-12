import { createContext, useContext, useEffect, useEffectEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import {
   createFornecedorService,
   getAllActiveFornecedoresService,
   getAllFornecedoresService,
   getAllInactiveFornecedoresService,
   updateFornecedorService,
   updateFornecedorStatusService,
} from "../Services/fornecedores.service";
import { getScreenViewStatusByKey, setScreenViewStatusByKey } from "../utils/ViewStatusUtil";
import { customSearchFilterFornecedor, searchFilterData } from "../utils/SearchFilterUtil";

const FornecedorContext = createContext(null);

export function FornecedorProvider({ children }) {
   const [fornecedores, setFornecedores] = useState();
   const [filteredFornecedores, setFilteredFornecedores] = useState();
   const [currViewStatus, setCurrViewStatus] = useState(getScreenViewStatusByKey("fornecedores") || "ATIVO"); 

   const [isLoading, setIsLoading] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const searchValueMemo = useMemo(() => searchParams.get("search"), [searchParams]);


   // Alteração do viewStatus
   const changeCurrViewStatus = (newViewStatus) => {
      setCurrViewStatus(newViewStatus);
      setScreenViewStatusByKey("fornecedores", newViewStatus);
   }


   const getAllFornecedores = async (viewStatus) => {
      let res;
      if(!isLoading) {
         setIsLoading(true);
      }
      if(viewStatus === "ATIVO") {
         res = await getAllActiveFornecedoresService();
      
      } else {
         res = await getAllInactiveFornecedoresService();
      }

      setFornecedores(res.data);
      setFilteredFornecedores(res.data);
      setIsLoading(false);
   }

   const loadFilteredFornecedores = (fornecedores, searchValue) => {
      const fieldsForSearch = [
         "nome_fornecedor",
         "cnpj"
      ]
      if(fornecedores && Array.isArray(fornecedores)) {
         const filteredData = customSearchFilterFornecedor(fornecedores, searchValue, fieldsForSearch);
         setFilteredFornecedores(filteredData);
      }
   }

   const defineSearchParams = (searchValue) => {
      if (searchValue || searchValueMemo) {
         setSearchParams({ search: searchValue });
      }
   };

   const createFornecedor = async (fornecedorData) => {
      const res = await createFornecedorService(fornecedorData);
      if (res.data.status === "success" || res.status === 201) {
         await getAllFornecedores(currViewStatus);
         return true;
      }
   };

   const updateFornecedor = async (id, newFornecedorData) => {
      const res = await updateFornecedorService(id, newFornecedorData);

      if (res.data.status === "success" || res.status === 200) {
         await getAllFornecedores(currViewStatus);
         return true;
      }
   };

   const updateFornecedorStatus = async (id, newFornecedorStatus) => {
      const res = await updateFornecedorStatusService(id, newFornecedorStatus);

      if (res.data.status === "success" || res.status === 200) {
         await getAllFornecedores(currViewStatus);
         return true;
      }
   };

   const init = async () => {
      try {
         if(currViewStatus) {
            await getAllFornecedores(currViewStatus);
         }
      } catch (error) {
         console.log(error);
      }
   };

   // useEffectEvents
   const onInit = useEffectEvent(() => init());

   const onGetAllFornecedores = useEffectEvent((currViewStatus) => getAllFornecedores(currViewStatus));
   const onLoadFilteredFornecedores = useEffectEvent((fornecedores, searchValue) => loadFilteredFornecedores(fornecedores, searchValue))

   useEffect(() => {
      onInit();
   }, []);

   useEffect(() => {
      onLoadFilteredFornecedores(fornecedores, searchValueMemo);
   }, [fornecedores, searchValueMemo])

   useEffect(() => {
      onGetAllFornecedores(currViewStatus)
   }, [currViewStatus])


   return(
      <FornecedorContext.Provider value={{
         fornecedores,
         filteredFornecedores,
         isLoading,
         currViewStatus,
         changeCurrViewStatus,
         getAllFornecedores,
         createFornecedor,
         updateFornecedor,
         updateFornecedorStatus,
         searchValueMemo,
         defineSearchParams
      }}>
         {children}
      </FornecedorContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFornecedor = () => useContext(FornecedorContext);
