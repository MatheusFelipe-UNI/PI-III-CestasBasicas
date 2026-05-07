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
import { searchFilterData } from "../utils/SearchFilterUtil";

const FornecedorContext = createContext(null);

export function FornecedorProvider({ children }) {
   const [fornecedores, setFornecedores] = useState();
   const [filteredFornecedores, setFilteredFornecedores] = useState();
   const [currViewStatus, setCurrViewStatus] = useState(getScreenViewStatusByKey("fornecedores") || "ATIVO"); 

   const [activeFornecedores, setActiveFornecedores] = useState();
   const [filteredActiveFornecedores, setFilteredActiveFornecedores] = useState();

   //  Inativos
   const [inactiveFornecedores, setInactiveFornecedores] = useState();
   const [filteredInactiveFornecedores, setFilteredInactiveFornecedores] = useState();

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
         const filteredData = searchFilterData(fornecedores, searchValue);
         setFilteredFornecedores(filteredData);
      }
   }

   // PENDENTE
   const loadFilteredActiveFornecedores = (activeFornecedores, searchValue) => {
      if (activeFornecedores && Array.isArray(activeFornecedores)) {
         const filteredData = () => null;
         setFilteredActiveFornecedores();
      }
   };

   // PENDENTE
   const loadFilteredInactiveFornecedores = (inactiveFornecedores, searchValue) => {
      if (inactiveFornecedores && Array.isArray(inactiveFornecedores)) {
         const filteredData = () => null;
         setFilteredInactiveFornecedores();
      }
   };

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
         await getAllActiveFornecedores();
         return true;
      }
   };

   const updateFornecedorStatus = async (id, newFornecedorStatus) => {
      const res = await updateFornecedorStatusService(id, newFornecedorStatus);

      if (res.data.status === "success" || res.status === 200) {
         await getAllActiveFornecedores();
         await getAllInactiveFornecedores();
      }
   };

   const init = async () => {
      try {
         await getAllFornecedores();
      } catch (error) {
         console.log(error);
      }
   };

   // useEffectEvents
   const onInit = useEffectEvent(() => init());

   const onLoadFilteredFornecedores = useEffectEvent((fornecedores, searchValue) => loadFilteredFornecedores(fornecedores, searchValue))

   useEffect(() => {
      onInit();
   }, []);

   useEffect(() => {
      onLoadFilteredFornecedores(fornecedores, searchValueMemo);
   }, [fornecedores, searchValueMemo])

   useEffect(() => {
      getAllFornecedores(currViewStatus)
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
