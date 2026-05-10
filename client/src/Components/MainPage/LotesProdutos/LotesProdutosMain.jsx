import { NavLink } from "react-router";
import { ActionBar } from "../../ActionBar/ActionBar";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";
import { FaArrowLeft as IconLeft} from "react-icons/fa6";
import styles from "./LotesProdutosMain.module.css";
import { useModal } from "../../../Context/ModalContext";
import { useLoteProduto } from "../../../Context/LoteProdutosContext";
import { getLoteProdutoByIdService } from "../../../Services/loteProdutos.service";
import { Loading } from "../../Loading/Loading";
import { TableDefaultEditable } from "../../Table/TableDefaultEditable/TableDefaultEditable";
import { useAlert } from "../../../Context/AlertContext";


export function LotesProdutosMain() {
   const { showModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const {
      filteredLoteProdutos: lotesProdutos,
      isLoading,
      currViewStatus,
      changeCurrViewStatus,
      updateLoteProdutoStatus,
      defineSearchParams,
      searchValueMemo: searchValue
   } = useLoteProduto();

   const handleOpenModal = () => {
      showModal({
         modalName: "addLoteProduto",
      })
   }

   const handleEditLoteProduto = (e) => {
      const idValue = e.target.closest("tr").id;
      showModal({
         modalName: "editLoteProduto",
         data: { id: idValue }
      })
   }

   const handleOnChangeStatusLoteProduto = async (id) => {
      try {
         const loteProduto = await getLoteProdutoByIdService(id);
         const { status: currStatus } = loteProduto.data;
         let newStatus;

         if (currStatus === "ATIVO") {
            newStatus = "INATIVO";
         } else {
            newStatus = "ATIVO";
         }

         if (await updateLoteProdutoStatus(id, newStatus)) {
            showSuccessAlert({
               title: "Lote de Produto Alterado com Sucesso!"
            });
         }

      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Alterar Status de Lote de Produto",
               message: errMessage,
            });
         }
      }
   }

   // Informações de tabela
   const fieldCollection = [
      "ID", 
      "Produto", 
      "Fornecedor", 
      "Qtd Adquirida", 
      "Valor Unitário",
      "Está Vencido",
      "Data de Validade",
      "Ultima alteração em"
   ];
   const fieldExcludes = ["tipo_unidade", "data_alteracao"];

   return(
      <>
         <div className={styles.lotesProdutosContent__returnLink}>
            <NavLink to={"/produtos"}>
               <IconLeft size={20}/> Voltar
            </NavLink>
         </div>
         <ActionBar
            viewName="Lote Produto"
            handleOpenModal={handleOpenModal}
            searchFilter={searchValue}
            onChangeSearchFilter={defineSearchParams}
         />
         <ViewStatusBar
            viewName="Lote Produtos"
            viewStatusName="loteProdutos"
            changeViewStatus={changeCurrViewStatus}
         />
         {
            isLoading ? (
               <Loading/>
            ) : (
               <TableDefaultEditable
                  fieldCollection={fieldCollection}
                  fieldsExcludes={fieldExcludes}
                  dataCollection={lotesProdutos}
                  handleEdit={handleEditLoteProduto}
                  handleStatusChange={handleOnChangeStatusLoteProduto}
                  currViewStatus={currViewStatus}
               />
            )
         }
      </>
   )
}