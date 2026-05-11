import TableDefault from "../../Table/TableDefault/TableDefault";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";
import { FaGear as IconConfig } from "react-icons/fa6";
import { FaTrashAlt as IconDel, FaUndo as IconUndo } from "react-icons/fa";
import { useModal } from "../../../Context/ModalContext";
import { ActionBar } from "../../ActionBar/ActionBar";
import { useAlert } from "../../../Context/AlertContext";
import { useCesta } from "../../../Context/CestaContext";
import { getCestaByIdService } from "../../../Services/cesta.service";
import { getElementIdTable } from "../../../utils/ManipulateDataUtil";
import { Loading } from "../../Loading/Loading";

export function CestasMain() {
   const { showModal } = useModal();
   const { 
      showSuccessAlert, 
      showErrorAlert, 
      showConfirmAlert 
   } = useAlert();
   const {
      filteredCestas: cestas,
      isLoading,
      currViewStatus,
      changeCurrViewStatus,
      updateCestaStatus,
      defineSearchParams,
      searchValueMemo: searchValue
   } = useCesta();

   const handleOpenModal = () => {
      showModal({
         modalName: "addCesta",
         customStyle: {
            overflow: "auto"
         },
      })
   }

   const handleEditCesta = (e) => {
      const idValue = e.target.closest("tr").id;
      showModal({
         modalName: "editCesta",
         data: {
            id: idValue
         },
         customStyle: {
            overflow: "auto"
         },
      })
   }

   const handleOnChangeStatusCesta = async (id) => {
      try {
         const cesta = await getCestaByIdService(id);
         const { status: currStatus } = cesta.data;
         let newStatus;

         if (currStatus === "ATIVO") {
            newStatus = "INATIVO";
         } else {
            newStatus = "ATIVO";
         }

         if (await updateCestaStatus(id, newStatus)) {
            showSuccessAlert({
               title: "Cesta Alterada com Sucesso!"
            });
         }

      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Alterar Status de Cesta",
               message: errMessage,
            });
         }  
      }
   }

   const handleConfirmDelete = async (e) => {
      const id = getElementIdTable(e);
      await showConfirmAlert({
         title: "Desativar Cesta",
         message:
            "Você tem certeza que deseja DESATIVAR a Cesta? (Esta ação poderá ser desfeita)",
         handleConfirm: async () => await handleOnChangeStatusCesta(id),
      });
   };

   const handleConfirmReturn = async (e) => {
      const id = getElementIdTable(e);
      await showConfirmAlert({
         title: "Reativar Cesta",
         message: "Você tem certeza que deseja REATIVAR a Cesta?",
         handleConfirm: async () => await handleOnChangeStatusCesta(id)
      })
   }

   const fieldCollection = [
      "ID",
      "Nome Cesta",
      "Qtd. Disponível",
      "Valor Unitário",
      "Criado em",
      "Ultima Alteração em"
   ];

   const fieldsExcludes = ["itens_cesta","status"];

   const buttonCollection = [
      {
         id: 1,
         infoView: <IconConfig/>,
         className: "subBtn",
         toolTipsText: "Visualizar Detalhes",
         handleAction: handleEditCesta
      }, 
      {
         id: 2,
         infoView: <IconDel/>,
         className: "delBtn",
         toolTipsText: "Inativar",
         handleAction: handleConfirmDelete
      }
   ]

   const btnCollectionForInactive = [
      {
         id: 1,
         infoView: <IconUndo/>,
         handleAction: handleConfirmReturn,
         className: "editBtn",
         toolTipsText: "Reativar",
      }
   ]

   return(
      <>
         <ActionBar
            viewName="Cesta Básica"
            handleOpenModal={handleOpenModal}
            searchFilter={searchValue}
            onChangeSearchFilter={defineSearchParams}
         />
         <ViewStatusBar 
            viewName="Cestas"
            viewStatusName="cestas"
            changeViewStatus={changeCurrViewStatus}
         />
         {isLoading ? (
            <Loading/>
         ) : (
            <TableDefault
               fieldCollection={fieldCollection}
               dataCollection={cestas}
               fieldsExcludes={fieldsExcludes}
               btnCollection={currViewStatus === "ATIVO" ? buttonCollection : btnCollectionForInactive}
            />
         )}
      </>
   )
}