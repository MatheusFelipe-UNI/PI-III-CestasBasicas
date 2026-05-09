import { useAlert } from "../../../../Context/AlertContext";
import { FormProduto } from "../../../Forms/Produtos/FormProduto";
import { useModal } from "../../../../Context/ModalContext";
import { useProduto } from "../../../../Context/ProdutosContext";

export function ModalAddProduto() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { closeModal } = useModal();
   const { createProduto } = useProduto();

   const handleRegisterProduto = async ({ nome_produto, tipo_unidade, estoque_minimo }) => {
      try {
         if(!nome_produto || !tipo_unidade || (estoque_minimo === null || estoque_minimo === undefined)) {
            showErrorAlert({
               title: "Erro ao Cadastrar Produto",
               message: "Um ou mais Campos vazios!"
            })
         }

         if(await createProduto({
            nome_produto,
            tipo_unidade,
            estoque_minimo
         })) {
            showSuccessAlert({
               title: "Produto Cadastrado com Sucesso!"
            });
            closeModal();
         }
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
      <FormProduto 
         handleProdutoSubmit={handleRegisterProduto} 
         handleCancel={closeModal}
      />
   )
}