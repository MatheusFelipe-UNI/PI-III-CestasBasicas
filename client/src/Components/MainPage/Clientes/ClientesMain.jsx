import { useAlert } from "../../../Context/AlertContext";
import { useCliente } from "../../../Context/ClientesContext";
import { useModal } from "../../../Context/ModalContext";
import { getClienteByIdService } from "../../../Services/clientes.service";
import { ActionBar } from "../../ActionBar/ActionBar";
import { Loading } from "../../Loading/Loading";
import { TableDefaultEditable } from "../../Table/TableDefaultEditable/TableDefaultEditable";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";

export function ClientesMain() {
   const { showModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const {
      filteredClientes: clientes,
      isLoading,
      currViewStatus,
      changeCurrViewStatus,
      updateClienteStatus,
      defineSearchParams,
      searchValueMemo: searchValue,
   } = useCliente();

   const handleOpenModal = () => {
      showModal({
         modalName: "addCliente",
      });
   };

   const handleEditCliente = (e) => {
      const idValue = e.target.closest("tr").id;
      showModal({
         modalName: "editCliente",
         data: {
            id: idValue,
         },
      });
   };

   const handleOnChangeStatusCliente = async (id) => {
      try {
         const cliente = await getClienteByIdService(id);
         const { status: currStatus } = cliente.data;
         let newStatus;

         if (currStatus === "ATIVO") {
            newStatus = "INATIVO";
         } else {
            newStatus = "ATIVO";
         }

         if (await updateClienteStatus(id, newStatus)) {
            showSuccessAlert({
               title: "Cliente Alterado com Sucesso!",
            });
         }
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Mover Fornecedor",
               message: errMessage,
            });
         }
      }
   };

   const fieldCollection = [
      "ID",
      "Nome Cliente",
      "CPF/CNPJ",
      "Telefone",
      "Tipo de Cliente",
      "Ultima Alteração em",
   ];

   const fieldExcludes = ["status", "data_criacao"]

   return (
      <>
         <ActionBar
            viewName="Cliente"
            handleOpenModal={handleOpenModal}
            searchFilter={searchValue}
            onChangeSearchFilter={defineSearchParams}
         />
         <ViewStatusBar
            viewName="Clientes"
            viewStatusName="clientes"
            changeViewStatus={changeCurrViewStatus}
         />
         {isLoading ? (
            <Loading />
         ) : (
            <TableDefaultEditable
               fieldCollection={fieldCollection}
               fieldsExcludes={fieldExcludes}
               dataCollection={clientes}
               handleEdit={handleEditCliente}
               handleStatusChange={handleOnChangeStatusCliente}
               currViewStatus={currViewStatus}
            />
         )}
      </>
   );
}
