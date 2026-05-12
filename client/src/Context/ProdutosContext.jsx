import { createContext, useContext, useEffect, useEffectEvent, useMemo, useState } from "react";
import { getScreenViewStatusByKey, setScreenViewStatusByKey } from "../utils/ViewStatusUtil";
import { useSearchParams } from "react-router";
import {
   createProdutoService,
   getAllActiveProdutosService,
   getAllInactiveProdutosService,
   updateProdutoService,
   updateProdutoStatusService,
} from "../Services/produtos.service";
import { searchFilterData } from "../utils/SearchFilterUtil";

const ProdutoContext = createContext(null);

export function ProdutoProvider({ children }) {
   const [produtos, setProdutos] = useState();
   const [filteredProdutos, setFilteredProdutos] = useState();
   const [currViewStatus, setCurrViewStatus] = useState(
      getScreenViewStatusByKey("produtos") || "ATIVO",
   );

   const [isLoading, setIsLoading] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const searchValueMemo = useMemo(() => searchParams.get("search"), [searchParams]);

   // Alteração do viewStatus
   const changeCurrViewStatus = (newViewStatus) => {
      setCurrViewStatus(newViewStatus);
      setScreenViewStatusByKey("produtos", newViewStatus);
   };

   const getAllProdutos = async (viewStatus) => {
      let res;
      if (!isLoading) {
         setIsLoading(true);
      }
      if (viewStatus === "ATIVO") {
         res = await getAllActiveProdutosService();
      } else {
         res = await getAllInactiveProdutosService();
      }

      setProdutos(res.data);
      setFilteredProdutos(res.data);
      setIsLoading(false);
   };

   const loadFilteredProdutos = (produtos, searchValue) => {
      const fieldsForSearch = [
         "nome_produto",
         "tipo_unidade",
         "quantidade_estoque",
         "estoque_minimo",
         "status_estoque"
      ];

      if (produtos && Array.isArray(produtos)) {
         const filteredData = searchFilterData(produtos, searchValue, fieldsForSearch);
         setFilteredProdutos(filteredData);
      }
   };

   const defineSearchParams = (searchValue) => {
      if (searchValue || searchValueMemo) {
         setSearchParams({ search: searchValue });
      }
   };

   const createProduto = async (produtoData) => {
      const res = await createProdutoService(produtoData);

      if (res.data.status === "success" || res.status === 201) {
         await getAllProdutos(currViewStatus);
         return true;
      }
   };

   const updateProduto = async (id, newProdutoData) => {
      const res = await updateProdutoService(id, newProdutoData);

      if (res.data.status === "success" || res.status === 200) {
         await getAllProdutos(currViewStatus);
         return true;
      }
   };

   const updateProdutoStatus = async (id, newProdutoStatus) => {
      const res = await updateProdutoStatusService(id, newProdutoStatus);

      if (res.data.status === "success" || res.status === 200) {
         await getAllProdutos(currViewStatus);
         return true;
      }
   };

   const init = async () => {
      try {
         if(currViewStatus) {
            await getAllProdutos(currViewStatus);
         }
      } catch (error) {
         console.log(error);
      }
   };

   // useEffectEvents
   const onInit = useEffectEvent(() => init());

   const onGetAllProdutos = useEffectEvent((currViewStatus) => getAllProdutos(currViewStatus));
   const onLoadFilteredProdutos = useEffectEvent((produtos, searchValue) =>
      loadFilteredProdutos(produtos, searchValue),
   );

   useEffect(() => {
      onInit();
   }, []);

   useEffect(() => {
      onLoadFilteredProdutos(produtos, searchValueMemo);
   }, [produtos, searchValueMemo]);

   useEffect(() => {
      onGetAllProdutos(currViewStatus);
   }, [currViewStatus]);

   return (
      <ProdutoContext.Provider
         value={{
            produtos,
            filteredProdutos,
            isLoading,
            currViewStatus,
            changeCurrViewStatus,
            getAllProdutos,
            createProduto,
            updateProduto,
            updateProdutoStatus,
            searchValueMemo,
            defineSearchParams,
         }}
      >
         {children}
      </ProdutoContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProduto = () => useContext(ProdutoContext);
