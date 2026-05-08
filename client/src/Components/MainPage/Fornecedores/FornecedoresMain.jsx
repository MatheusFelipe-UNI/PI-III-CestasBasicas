import { useAlert } from "../../../Context/AlertContext";
import { useFornecedor } from "../../../Context/FornecedoresContext";
import { useModal } from "../../../Context/ModalContext";
import { getFornecedorByIdService } from "../../../Services/fornecedores.service";
import { ActionBar } from "../../ActionBar/ActionBar";
import { Loading } from "../../Loading/Loading";
import { TableDefaultEditable } from "../../Table/TableDefaultEditable/TableDefaultEditable";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";
import { FaUndo as IconUndo } from "react-icons/fa";


export function FornecedoresMain() {
   const { showModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { 
      filteredFornecedores: fornecedores, 
      isLoading, 
      currViewStatus,
      changeCurrViewStatus,
      updateFornecedorStatus,
      defineSearchParams,
      searchValueMemo: searchValue
   } = useFornecedor();

   const handleOpenModal = () => {
      showModal({
         modalName: "addFornecedor",
      });
   };

   const handleEditFornecedor = (e) => {
      const idValue = e.target.closest("tr").id;
      showModal({
         modalName: "editFornecedor",
         data: { id: idValue }
      })
   }

   const handleOnChangeStatusFornecedor = async (id) => {
      try {
         const fornecedor = await getFornecedorByIdService(id);
         const { status: currStatus } = fornecedor.data;
         let newStatus;

         if(currStatus === "ATIVO") {
            newStatus = "INATIVO";
         } else {
            newStatus = "ATIVO";
         }

         if(await updateFornecedorStatus(id, newStatus)) {
            showSuccessAlert({
               title: "Fornecedor Alterado com Sucesso!"
            });
         }

      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Mover Fornecedor",
               message: errMessage
            })
         }
      }
   }

   const fieldCollection = ["ID", "Fornecedor", "CNPJ", "Criado em", "Ultima Alteração em"];

   return (
      <>
         <ActionBar 
            viewName="Fornecedor" 
            handleOpenModal={handleOpenModal} 
            searchFilter={searchValue}
            onChangeSearchFilter={defineSearchParams}
         />
         <ViewStatusBar 
            viewName="Fornecedores" 
            viewStatusName="fornecedores" 
            changeViewStatus={changeCurrViewStatus}
         />
         {isLoading ? (
            <Loading />
         ) : (
            <TableDefaultEditable 
               fieldCollection={fieldCollection} 
               dataCollection={fornecedores} 
               handleEdit={handleEditFornecedor}
               handleStatusChange={handleOnChangeStatusFornecedor}
               currViewStatus={currViewStatus}
            />
         )}
      </>
   );
}
