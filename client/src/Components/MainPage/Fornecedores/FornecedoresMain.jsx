import { TableDefaultEditable } from "../../Table/TableDefaultEditable/TableDefaultEditable";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";

export function FornecedoresMain() {
   const fieldCollection = [
      "ID",
      "Fornecedor",
      "CNPJ",
      "Ultima Alteração em"
   ];

   const tempDataCollection = [
      {
         id: 1,
         nome_fornecedor: "Fornecedor 1",
         cnpj: "00.000.000/0001-00",
         ultima_alteracao: "01/01/2024"
      },
      {
         id: 2,
         nome_fornecedor: "Fornecedor 2",
         cnpj: "00.000.000/0002-00",
         ultima_alteracao: "02/02/2024"
      }
   ]

   return(
      <>
         <div>
            <input type="text" />
         </div>
         <ViewStatusBar viewName="Fornecedores"/>
         <TableDefaultEditable
            fieldCollection={fieldCollection}
            dataCollection={tempDataCollection}
         />
      </>
   )
}