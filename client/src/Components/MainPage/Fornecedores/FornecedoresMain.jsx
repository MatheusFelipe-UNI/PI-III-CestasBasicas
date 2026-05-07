import { useFornecedor } from "../../../Context/FornecedoresContext";
import { useModal } from "../../../Context/ModalContext";
import { ActionBar } from "../../ActionBar/ActionBar";
import { Loading } from "../../Loading/Loading";
import { TableDefaultEditable } from "../../Table/TableDefaultEditable/TableDefaultEditable";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";

export function FornecedoresMain() {
   const { showModal } = useModal();
   const { 
      fornecedores, 
      isLoading, 
      currViewStatus,
      changeCurrViewStatus 
   } = useFornecedor();

   const handleOpenModal = () => {
      showModal({
         modalName: "addFornecedor",
         data: {
            id: "1",
         },
      });
   };

   const fieldCollection = ["ID", "Fornecedor", "CNPJ", "Ultima Alteração em"];

   const tempDataCollection = [
      {
         id: 1,
         nome_fornecedor: "Fornecedor 1",
         cnpj: "00.000.000/0001-00",
         ultima_alteracao: "01/01/2024",
      },
      {
         id: 2,
         nome_fornecedor: "Fornecedor 2",
         cnpj: "00.000.000/0002-00",
         ultima_alteracao: "02/02/2024",
      },
   ];

   return (
      <>
         <ActionBar viewName="Fornecedor" handleOpenModal={handleOpenModal} />
         <ViewStatusBar 
            viewName="Fornecedores" 
            viewStatusName="fornecedores" 
            currViewStatus={currViewStatus}
            changeViewStatus={changeCurrViewStatus}
         />
         {isLoading ? (
            <Loading />
         ) : (
            <TableDefaultEditable fieldCollection={fieldCollection} dataCollection={fornecedores} />
         )}
      </>
   );
}
