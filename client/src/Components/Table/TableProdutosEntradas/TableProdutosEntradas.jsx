import TBody from "../TableComponents/TBody/TBody";
import { THeadProdutosEntrada } from "../TableComponents/THead/THeadProdutosEntrada";

export function TableProdutosEntradas({ entradaProdutosData, fieldsExcludes = [] }) {
   const fieldCollection = ["Produto", "Fornecedor", "Tipo Unidade", "Qtd. Adquirida"];

   const entradaProdutosHeaderData = {
      id: entradaProdutosData.id,
      data_recebimento: entradaProdutosData.data_recebimento,
   };
   const entradaItensCollection = entradaProdutosData.entrada_produtos || [];

   return (
      <div className="tableContainer fadeIn">
         <table>
            <thead>
               <THeadProdutosEntrada
                  dataHeaderEntrada={entradaProdutosHeaderData}
                  fieldCollection={fieldCollection}
               />
            </thead>
            <tbody>
               {entradaItensCollection.map((entradaItem) => (
                  <TBody
                     key={entradaItem?.id}
                     dataInfo={entradaItem}
                     fieldsExcludes={fieldsExcludes}
                  />
               ))}
            </tbody>
         </table>
      </div>
   );
}
