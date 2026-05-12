import { useAlert } from "../../../../Context/AlertContext";
import { useVendaCesta } from "../../../../Context/VendaCestaContext";
import { getVendaCestaByIdService } from "../../../../Services/vendasCestas.service";
import { getElementIdTable } from "../../../../utils/ManipulateDataUtil";
import { ActionBar } from "../../../ActionBar/ActionBar";
import { Loading } from "../../../Loading/Loading";
import TableDefault from "../../../Table/TableDefault/TableDefault";
import { FaCheck as IconConfirm, FaTrashAlt as IconDel, } from "react-icons/fa";



export function CestasVendasPendentesSub() {
   const { showConfirmAlert, showSuccessAlert, showErrorAlert } = useAlert();
   const {
      filteredVendaCestas: vendas,
      isLoading,
      currViewStatus,
      changeCurrViewStatus,
      updateVendaCestaStatus,
      deleteVendaCesta,
      defineSearchParams,
      searchValueMemo: searchValue,
   } = useVendaCesta();

   const handleChangeViewStatus = async (e) => {
      const idValue = e.target.closest("tr").id;
      try {

         if(await updateVendaCestaStatus(idValue, "CONCLUIDA")) {
            showSuccessAlert({
               title: "Retirada realizada com sucesso!!",
            })
         }
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Retirar Cesta",
               message: errMessage,
            });
         }         
      }
   }

   const handleOnDeleteVenda = async (id) => {
      try {
         if(await deleteVendaCesta(id)) {
            showSuccessAlert({
               title: "Venda Cancelada com sucesso!",
            })
         }
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao remover Cesta",
               message: errMessage,
            });
         }         
      }
   }

   const handleConfirmDelete = async (e) => {
      const id = getElementIdTable(e);
      await showConfirmAlert({
         title: "Excluir Venda de Cesta",
         message:
            "Você tem certeza que deseja EXCLUIR a Venda de Cesta? (Esta ação NÃO poderá ser desfeita)",
         handleConfirm: async () => await handleOnDeleteVenda(id),
      });
   };

   const fieldCollection = [
      "ID",
      "Cliente",
      "Cesta Solicitada",
      "Qtd. Solicitada",
      "Valor Total",
      "Cadastrado por",
      "Data Pedido",
   ];


   const buttonCollection = [
      {
         id: 1,
         infoView: <>
            <p style={{marginRight: "5px"}}>Finalizar Venda</p>
            <IconConfirm/>
         </>,
         className: "greenBtn",
         handleAction: handleChangeViewStatus
      },
      {
         id: 2,
         infoView: <IconDel/>,
         handleAction: handleConfirmDelete,
         className: "delBtn",
         toolTipsText: "Cancelar Venda"
      }
   ]

   return(
      <>
         <ActionBar
            viewName="Vendas Pendentes"
            hasActionButton={false}
            searchFilter={searchValue}
            onChangeSearchFilter={defineSearchParams}
         />
         {isLoading ? (
            <Loading/>
         ) : (
            <TableDefault
               fieldCollection={fieldCollection}
               dataCollection={vendas}
               btnCollection={buttonCollection}
            />
         )}
      </>
   )
}