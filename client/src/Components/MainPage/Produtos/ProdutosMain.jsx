import { useModal } from "../../../Context/ModalContext";
import { ActionBar } from "../../ActionBar/ActionBar";
import { TableProdutos } from "../../Table/TableProdutos/TableProdutos";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";

export function ProdutosMain() {
   const { showModal } = useModal();

   const handleOpenModal = () => {
      showModal({
         modalName: "addProduto",
         data: {
            id: "1"
         }
      })
   }

   return(
      <>
         <ActionBar viewName="Produto" handleOpenModal={handleOpenModal}/>
         <ViewStatusBar/>
         <TableProdutos/>
      </>
   )
}