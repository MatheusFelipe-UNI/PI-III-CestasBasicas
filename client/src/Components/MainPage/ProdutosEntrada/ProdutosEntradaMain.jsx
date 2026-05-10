import { TableProdutosEntradas } from "../../Table/TableProdutosEntradas/TableProdutosEntradas";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";
import { useModal } from "../../../Context/ModalContext";
import { ActionBar } from "../../ActionBar/ActionBar";
import { useEntradaProduto } from "../../../Context/EntradaProdutosContext";

export function ProdutosEntradaMain() {
   const { showModal } = useModal();
   const { 
      filteredEntradaProdutos: entradaProdutos,
      isLoading,
      currViewStatus,
      changeCurrViewStatus,
      defineSearchParams,
      searchValueMemo: searchValue
   } = useEntradaProduto();

   const fieldsExcludes = ["id"];
   const optionsCollection = ["RECEBIDOS", "CANCELADOS"];

   const entradaProdutosCollection = [
      {
         id: 1,
         data_recebimento: "2024-06-01",
         itens_entrada: [
            {
               id: 1,
               produto: "Arroz",
               fornecedor: "Fornecedor A",
               tipo_unidade: "kg",
               qtd_adquirida: 100
            },
            {
               id: 2,
               produto: "Arroz",
               fornecedor: "Fornecedor A",
               tipo_unidade: "kg",
               qtd_adquirida: 100
            }
         ]
      },
      {
         id: 2,
         data_recebimento: "2024-06-02",
         itens_entrada: [
            {
               id: 3,
               produto: "Arroz",
               fornecedor: "Fornecedor A",
               tipo_unidade: "kg",
               qtd_adquirida: 100
            },
            {
               id: 4,
               produto: "Arroz",
               fornecedor: "Fornecedor A",
               tipo_unidade: "kg",
               qtd_adquirida: 100
            }
         ]
      }
   ]

   return(
      <>
         <ActionBar 
            viewName="Entrada Produtos"
            searchFilter={searchValue}
            onChangeSearchFilter={defineSearchParams} 
            hasActionButton={false}
         />
         {/* <ViewStatusBar 
            viewName="Entrada de produtos"
            viewStatusName="entradaProdutos"
            changeViewStatus={changeCurrViewStatus}
            optionsCollection={optionsCollection} 
         /> */}
         <div className="layoutTableSpacing">
            {entradaProdutosCollection.map((data) => (
               <TableProdutosEntradas 
                  key={data.id}
                  entradaProdutosData={data}
                  fieldsExcludes={fieldsExcludes}
               />
            ))}
         </div>
      </>
   )
}