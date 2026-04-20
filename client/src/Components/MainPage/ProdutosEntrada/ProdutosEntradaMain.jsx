import { data } from "react-router";
import { TableProdutosEntradas } from "../../Table/TableProdutosEntradas/TableProdutosEntradas";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";

export function ProdutosEntradaMain() {
   const fieldsExcludes = ["id"];
   const optionsCollection = ["RECEBIDOS", "CANCELADOS"];

   const entradaProdutosCollection = [
      {
         id: 1,
         data_recebimento: "2024-06-01",
         entrada_produtos: [
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
         entrada_produtos: [
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
         <div>
            <input type="text" />
         </div>
         <ViewStatusBar 
            viewName="Entrada de produtos"
            optionsCollection={optionsCollection} 
         />
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