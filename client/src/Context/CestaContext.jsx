import { createContext, useContext, useEffect, useEffectEvent, useMemo, useState } from "react";
import { getScreenViewStatusByKey, setScreenViewStatusByKey } from "../utils/ViewStatusUtil";
import { useSearchParams } from "react-router";
import { createCestaService, getAllActiveCestasService, getAllInactiveCestasService, updateCestaService, updateCestaStatusService } from "../Services/cesta.service";
import { searchFilterData } from "../utils/SearchFilterUtil";

const CestaContext = createContext(null);

export function CestaProvider({ children }) {
   const [cestas, setCestas] = useState();
   const [filteredCestas, setFilteredCestas] = useState();
   const [currViewStatus, setCurrViewStatus] = useState(getScreenViewStatusByKey("cestas") || "ATIVO");

   const [isLoading, setIsLoading] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const searchValueMemo = useMemo(() => searchParams.get("search"), [searchParams]);

   // Alteração do viewStatus
   const changeCurrViewStatus = (newViewStatus) => {
      setCurrViewStatus(newViewStatus);
      setScreenViewStatusByKey("cestas", newViewStatus);
   };

   const getAllCestas = async (viewStatus) => {
      let res;
      if (!isLoading) {
         setIsLoading(true);
      }
      if (viewStatus === "ATIVO") {
         res = await getAllActiveCestasService();
      } else {
         res = await getAllInactiveCestasService();
      }

      setCestas(res.data);
      setFilteredCestas(res.data);
      setIsLoading(false);
   }

   const loadFilteredCestas = (cestas, searchValue) => {
      const fieldForSearch = [
         "nome_cesta",
         "preco",
         "quantidade",
         "created_at",
         "updated_at"
      ];
      if(cestas && Array.isArray(cestas)) {
         const filteredData = searchFilterData(cestas, searchValue, fieldForSearch);
         setFilteredCestas(filteredData);
      }
   }

   const defineSearchParams = (searchValue) => {
      if (searchValue || searchValueMemo) {
         setSearchParams({ search: searchValue });
      }
   };

   const createCesta = async (cestaData) => {
      const res = await createCestaService(cestaData);
      if (res.data.status === "success" || res.status === 201) {
         await getAllCestas(currViewStatus);
         return true;
      }
   }

   const updateCesta = async (id, cestaData) => {
      const res = await updateCestaService(id, cestaData);

      if (res.data.status === "success" || res.status === 200) {
         await getAllCestas(currViewStatus);
         return true;
      }
   }

   const updateCestaStatus = async (id, newCestaStatus) => {
      const res = await updateCestaStatusService(id, newCestaStatus);

      if (res.data.status === "success" || res.status === 200) {
         await getAllCestas(currViewStatus);
         return true;
      }
   }

   const init = async () => {
      try {
         if(currViewStatus) {
            await getAllCestas(currViewStatus);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const onInit = useEffectEvent(() => init());

   const onGetAllCestas = useEffectEvent((currViewStatus) => getAllCestas(currViewStatus));
   const onLoadFilteredCestas = useEffectEvent((cestas, searchValue) => loadFilteredCestas(cestas, searchValue));

   useEffect(() => {
      onInit();
   }, []);

   useEffect(() => {
      onLoadFilteredCestas(cestas, searchValueMemo);
   }, [cestas, searchValueMemo]);

   useEffect(() => {
      onGetAllCestas(currViewStatus);
   }, [currViewStatus]);

   return (
      <CestaContext.Provider value={{
         cestas,
         filteredCestas,
         isLoading,
         currViewStatus,
         changeCurrViewStatus,
         getAllCestas,
         createCesta,
         updateCesta,
         updateCestaStatus,
         searchValueMemo,
         defineSearchParams
      }}>
         {children}
      </CestaContext.Provider>
   );

}

// eslint-disable-next-line react-refresh/only-export-components
export const useCesta = () => useContext(CestaContext);