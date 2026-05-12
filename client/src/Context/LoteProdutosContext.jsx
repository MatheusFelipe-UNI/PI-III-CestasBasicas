import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getScreenViewStatusByKey, setScreenViewStatusByKey } from "../utils/ViewStatusUtil";
import { useParams, useSearchParams } from "react-router";
import { 
   createLoteProdutoService, 
   getAllActiveLoteProdutosByProdutoIdService, 
   getAllInactiveLoteProdutosByProdutoIdService, 
   updateLoteProdutoService, 
   updateLoteProdutoStatusService 
} from "../Services/loteProdutos.service";
import { searchFilterData } from "../utils/SearchFilterUtil";
import { useEffectEvent } from "react";

const LoteProdutoContext = createContext(null);

export function LoteProdutoProvider({ children }) {
   const [loteProdutos, setLoteProdutos] = useState();
   const [filteredLoteProdutos, setFilteredLoteProdutos] = useState();
   const [currViewStatus, setCurrViewStatus] = useState(getScreenViewStatusByKey("loteProdutos") || "ATIVO");

   const [isLoading, setIsLoading] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const searchValueMemo = useMemo(() => searchParams.get("search"), [searchParams]);
   const { id: idProduto } = useParams();

   // Alteração do viewStatus
   const changeCurrViewStatus = (newViewStatus) => {
      setCurrViewStatus(newViewStatus);
      setScreenViewStatusByKey("loteProdutos", newViewStatus);
   };

   const getAllLoteProdutos = async (viewStatus) => {
      let res;
      if (!isLoading) {
         setIsLoading(true);
      }
      if (viewStatus === "ATIVO") {
         res = await getAllActiveLoteProdutosByProdutoIdService(idProduto);
      } else {
         res = await getAllInactiveLoteProdutosByProdutoIdService(idProduto);
      }

      setLoteProdutos(res.data);
      setFilteredLoteProdutos(res.data);
      setIsLoading(false);
   };

   const loadFilteredLoteProdutos = (loteProdutos, searchValue) => {
      const fieldsForSearch = [
         "nome_produto",
         "nome_fornecedor",
         "tipo_unidade",
         "valor_unitario",
         "qtd_disponivel",
         "is_vencido"
      ];

      if(loteProdutos && Array.isArray(loteProdutos)) {
         const filteredData = searchFilterData(loteProdutos, searchValue, fieldsForSearch);
         setFilteredLoteProdutos(filteredData) 
      }
   }

   const defineSearchParams = (searchValue) => {
      if (searchValue || searchValueMemo) {
         setSearchParams({ search: searchValue });
      }
   };

   const createLoteProduto = async (loteProdutoData) => {
      const res = await createLoteProdutoService(loteProdutoData);

      if (res.data.status === "success" || res.status === 201) {
         await getAllLoteProdutos(currViewStatus);
         return true;
      }
   };

   const updateLoteProduto = async (id, newLoteProdutoData) => {
      const res = await updateLoteProdutoService(id, newLoteProdutoData);

      if (res.data.status === "success" || res.status === 200) {
         await getAllLoteProdutos(currViewStatus);
         return true;
      }
   };

   const updateLoteProdutoStatus = async (id, newLoteProdutoStatus) => {
      const res = await updateLoteProdutoStatusService(id, newLoteProdutoStatus);

      if (res.data.status === "success" || res.status === 200) {
         await getAllLoteProdutos(currViewStatus);
         return true;
      }
   };

   const init = async () => {
      try {
         if(currViewStatus) {
            await getAllLoteProdutos(currViewStatus);
         }
      } catch (error) {
         console.log(error);
      }
   }

   // useEffectEvents
   const onInit = useEffectEvent(() => init());

   const onGetAllLoteProdutos = useEffectEvent((currViewStatus) => getAllLoteProdutos(currViewStatus));
   const onLoadFilteredLoteProdutos = useEffectEvent((loteProdutos, searchValue) => loadFilteredLoteProdutos(loteProdutos, searchValue));

   useEffect(() => {
      onInit();
   }, [])

   useEffect(() => {
      onLoadFilteredLoteProdutos(loteProdutos, searchValueMemo);
   }, [loteProdutos, searchValueMemo]);

   useEffect(() => {
      onGetAllLoteProdutos(currViewStatus);
   }, [currViewStatus]);

   return(
      <LoteProdutoContext.Provider
         value={{
            loteProdutos,
            filteredLoteProdutos,
            isLoading,
            currViewStatus,
            changeCurrViewStatus,
            getAllLoteProdutos,
            createLoteProduto,
            updateLoteProduto,
            updateLoteProdutoStatus,
            searchValueMemo,
            defineSearchParams
         }}
      >
         { children }
      </LoteProdutoContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoteProduto = () => useContext(LoteProdutoContext);