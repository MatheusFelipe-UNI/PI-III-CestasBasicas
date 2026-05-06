import { createContext, useContext, useEffect, useEffectEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import {
   createFornecedorService,
   getAllFornecedoresService,
   getAllInactiveFornecedoresService,
   updateFornecedorService,
   updateFornecedorStatusService,
} from "../Services/fornecedores.service";

const FornecedorContext = createContext(null);

export function FornecedorProvider({ children }) {
   const [activeFornecedores, setActiveFornecedores] = useState();
   const [filteredActiveFornecedores, setFilteredActiveFornecedores] = useState();

   //  Inativos
   const [inactiveFornecedores, setInactiveFornecedores] = useState();
   const [filteredInactiveFornecedores, setFilteredInactiveFornecedores] = useState();

   const [isLoading, setIsLoading] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const searchValueMemo = useMemo(() => searchParams.get("search"), [searchParams]);

   const getAllActiveFornecedores = async () => {
      if (!isLoading) {
         setIsLoading(true);
      }
      const res = await getAllFornecedoresService();
      setActiveFornecedores(res.data);
      setFilteredActiveFornecedores(res.data);
      setIsLoading(false);
   };

   const getAllInactiveFornecedores = async () => {
      if (!isLoading) {
         setIsLoading(true);
      }
      const res = await getAllInactiveFornecedoresService();
      setInactiveFornecedores(res.data);
      setFilteredInactiveFornecedores(res.data);
      setIsLoading(false);
   };

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
         await getAllActiveFornecedores();
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
         await getAllActiveFornecedores();
      } catch (error) {
         console.log(error);
      }
   };

   // useEffectEvents
   const onInit = useEffectEvent(() => init());

   const onLoadFilteredActiveFornecedores = useEffectEvent((fornecedores, searchValue) =>
      loadFilteredActiveFornecedores(fornecedores, searchValue),
   );
   const onLoadFilteredInactiveFornecedores = useEffectEvent((fornecedores, searchValue) =>
      loadFilteredInactiveFornecedores(fornecedores, searchValue),
   );

   useEffect(() => {
      onInit();
   }, []);

   useEffect(() => {
      onLoadFilteredActiveFornecedores(activeFornecedores, searchValueMemo);
   }, [activeFornecedores, searchValueMemo]);

   useEffect(() => {
      onLoadFilteredInactiveFornecedores(inactiveFornecedores, searchValueMemo);
   }, [inactiveFornecedores, searchValueMemo]);

   return(
      <FornecedorContext.Provider value={{
         activeFornecedores,
         filteredActiveFornecedores,
         inactiveFornecedores,
         filteredInactiveFornecedores,
         isLoading,
         getAllActiveFornecedores,
         getAllInactiveFornecedores,
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
