import { useAlert } from "../../../../Context/AlertContext";
import { useFornecedor } from "../../../../Context/FornecedoresContext";
import { useModal } from "../../../../Context/ModalContext";
import { FormFornecedor } from "../../../Forms/Fornecedores/FormFornecedor";

export function ModalAddFornecedor() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { createFornecedor } = useFornecedor();

   const handleRegisterFornecedor = async ({nome_fornecedor, cnpj}) => {
      try {
         if(!nome_fornecedor || !cnpj) {
            showErrorAlert({
               title: "Erro ao cadastrar Fornecedor",
               message: "Um ou mais campos vazios!"
            })
         }

         if(await createFornecedor({nome_fornecedor, cnpj})) {
            console.log("deu certo em cadastrar");
            showSuccessAlert({
               title: "Fornecedor Cadastrado com Sucesso!"
            });
            closeModal();
         }
         

      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao cadastrar Fornecedor",
               message: errMessage
            })
         }
      }
   }

   return(
      <FormFornecedor handleFornecedorSubmit={handleRegisterFornecedor} handleCancel={closeModal}/>
   )
}