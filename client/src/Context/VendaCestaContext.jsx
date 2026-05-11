import { createContext, useContext, useEffect, useEffectEvent, useMemo, useState } from "react";
import { getScreenViewStatusByKey, setScreenViewStatusByKey } from "../utils/ViewStatusUtil";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import {
   createVendaCestaService,
   getAllVendasCestasCanceladasService,
   getAllVendasCestasConcluidasService,
   getAllVendasCestasPendentesService,
   updateVendaCestaService,
   updateVendaCestaStatusService,
} from "../Services/vendasCestas.service";
import { searchFilterData } from "../utils/SearchFilterUtil";

const VendaCestaContext = createContext(null);

export function VendaCestaProvider({ children }) {
   const location = useLocation();
   const [vendaCestas, setVendaCestas] = useState();
   const [filteredVendaCestas, setFilteredVendaCestas] = useState();
   const [currViewStatus, setCurrViewStatus] = useState("pendentes");

   const [isLoading, setIsLoading] = useState(true);
   const [searchParams, setSearchParams] = useSearchParams();
   const searchValueMemo = useMemo(() => searchParams.get("search"), [searchParams]);

   // Alteração do viewStatus
   const changeCurrViewStatus = (newViewStatus) => {
      setCurrViewStatus(newViewStatus);
      setScreenViewStatusByKey("vendasCestas", newViewStatus);
   };

   const getAllVendaCestas = async (viewStatus) => {
      let res;
      if (!isLoading) {
         setIsLoading(true);
      }

      if (viewStatus === "concluidas") {
         res = await getAllVendasCestasConcluidasService();
      } else if (viewStatus === "canceladas") {
         res = await getAllVendasCestasCanceladasService();
      } else {
         res = await getAllVendasCestasPendentesService();
      }

      setVendaCestas(res.data);
      setFilteredVendaCestas(res.data);
      setIsLoading(false);
   };

   const loadFilteredVendaCestas = (vendaCestas, searchValue) => {
      const fieldsForSearch = [
         "nome_cliente",
         "nome_cestas",
         "usuario",
         "valor_total",
         "data_venda",
      ];

      if (vendaCestas && Array.isArray(vendaCestas)) {
         const filteredData = searchFilterData(vendaCestas, searchValue, fieldsForSearch);
         setFilteredVendaCestas(filteredData);
      }
   };

   const defineSearchParams = (searchValue) => {
      if (searchValue || searchValueMemo) {
         setSearchParams({ search: searchValue });
      }
   };

   const createVendaCesta = async (vendaCestaData) => {
      const res = await createVendaCestaService(vendaCestaData);

      if (res.data.status === "success" || res.status === 201) {
         await getAllVendaCestas(currViewStatus);
         return true;
      }
   };

   const updateVendaCesta = async (id, newVendaCestaData) => {
      const res = await updateVendaCestaService(id, newVendaCestaData);

      if (res.data.status === "success" || res.status === 200) {
         await getAllVendaCestas(currViewStatus);
         return true;
      }
   };

   const updateVendaCestaStatus = async (id, newVendaCestaStatus) => {
      const res = await updateVendaCestaStatusService(id, newVendaCestaStatus);

      if (res.data.status === "success" || res.status === 200) {
         await getAllVendaCestas(currViewStatus);
         return true;
      }
   };

   const changeCurrViewStatusByPath = (path) => {
      const currPath = path.split('/').filter(Boolean).pop();
      setCurrViewStatus(currPath);
   }

   const init = async () => {
      try {
         if (currViewStatus) {
            await getAllVendaCestas(currViewStatus); 
         }
      } catch (error) {
         console.log(error);
      }
   };

   const onInit = useEffectEvent(() => init());
   const onGetAllVendaCestas = useEffectEvent((currViewStatus) =>
      getAllVendaCestas(currViewStatus),
   );
   const onLoadFilteredVendaCestas = useEffectEvent((vendaCestas, searchValue) =>
      loadFilteredVendaCestas(vendaCestas, searchValue),
   );
   const onChangeCurrViewStatus = useEffectEvent((newViewStatus) => changeCurrViewStatus(newViewStatus));

   useEffect(() => {
      onInit();
   }, []);

   useEffect(() => {
      onLoadFilteredVendaCestas(vendaCestas, searchValueMemo);
   }, [vendaCestas, searchValueMemo]);

   useEffect(() => {
      onGetAllVendaCestas(currViewStatus);
   }, [currViewStatus]);


   useEffect(() => {
      const currPath = location.pathname.split('/').filter(Boolean).pop();
      onChangeCurrViewStatus(currPath)
   }, [location.pathname]);

   return (
      <VendaCestaContext.Provider
         value={{
            vendaCestas,
            filteredVendaCestas,
            isLoading,
            currViewStatus,
            changeCurrViewStatus,
            getAllVendaCestas,
            createVendaCesta,
            updateVendaCesta,
            updateVendaCestaStatus,
            searchValueMemo,
            defineSearchParams,
         }}
      >
         {children}
      </VendaCestaContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useVendaCesta = () => useContext(VendaCestaContext);
