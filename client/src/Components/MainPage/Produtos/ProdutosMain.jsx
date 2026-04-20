import { TableProdutos } from "../../Table/TableProdutos/TableProdutos";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";

export function ProdutosMain() {
   return(
      <>
         <div>
            <input type="text" />
            <ViewStatusBar/>
            <TableProdutos/>
         </div>
      </>
   )
}