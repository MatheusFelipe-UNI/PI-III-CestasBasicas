import { useNavigate } from "react-router";
import { useAlert } from "../../../Context/AlertContext";
import { useModal } from "../../../Context/ModalContext";
import { useProduto } from "../../../Context/ProdutosContext";
import { getProdutoByIdService } from "../../../Services/produtos.service";
import { ActionBar } from "../../ActionBar/ActionBar";
import { Loading } from "../../Loading/Loading";
import { TableProdutos } from "../../Table/TableProdutos/TableProdutos";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";

export function ProdutosMain() {
   const { showModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const {
      filteredProdutos: produtos,
      isLoading,
      currViewStatus,
      changeCurrViewStatus,
      updateProdutoStatus,
      defineSearchParams,
      searchValueMemo: searchValue
   } = useProduto();
   const navigate = useNavigate();

   const handleOpenModal = () => {
      showModal({
         modalName: "addProduto",
      })
   }

   const handleViewLotes = (e) => {
      const idValue = e.target.closest("tr").id;
      navigate(`/produtos/${idValue}/lotes`)
   }

   const handleEditProduto = (e) => {
      const idValue = e.target.closest("tr").id;
      showModal({
         modalName: "editProduto",
         data: {
            id: idValue,
         },
      });
   };

   const handleOnChangeStatusProduto = async (id) => {
      try {
         const produto = await getProdutoByIdService(id);
         const { status: currStatus } = produto.data;
         let newStatus;

         if (currStatus === "ATIVO") {
            newStatus = "INATIVO";
         } else {
            newStatus = "ATIVO";
         }

         if (await updateProdutoStatus(id, newStatus)) {
            showSuccessAlert({
               title: "Status de Produto Alterado com Sucesso!",
            });
         }
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Alterar Status de Produto",
               message: errMessage,
            });
         }
      }
   };


   return(
      <>
         <ActionBar 
            viewName="Produto" 
            handleOpenModal={handleOpenModal}
            searchFilter={searchValue}
            onChangeSearchFilter={defineSearchParams}
         />
         <ViewStatusBar
            viewName="Produtos"
            viewStatusName="produtos"
            changeViewStatus={changeCurrViewStatus}
         />
         {
            isLoading ? (
               <Loading/>
            ) : (
               <TableProdutos
                  dataCollection={produtos}
                  handleViewLotes={handleViewLotes}
                  handleEdit={handleEditProduto}
                  handleStatusChange={handleOnChangeStatusProduto}
                  currViewStatus={currViewStatus}
               />
            )
         }
         
      </>
   )
}