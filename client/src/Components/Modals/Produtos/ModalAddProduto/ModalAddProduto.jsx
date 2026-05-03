import { useAlert } from "../../../../Context/AlertContext";
import { FormProduto } from "../../../Forms/Produtos/FormProduto";
import { useModal } from "../../../../Context/ModalContext";

export function ModalAddProduto() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();

   const handleRegisterProduto = async (produtoData) => {
      // LOGICA PENDENTE
      try {
         console.log(produtoData);
         showSuccessAlert({
            title: "Cadastro Realizado com Sucesso!"
         });
         closeModal();
      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Cadastrar Produto",
               message: errMessage
            })
            
         }
      }
   }

   return(
      <FormProduto handleProdutoSubmit={handleRegisterProduto} handleCancel={closeModal}/>
   )
}