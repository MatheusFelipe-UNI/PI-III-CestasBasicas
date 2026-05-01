import { useAlert } from "../../../../Context/AlertContext";
import { useModal } from "../../../../Context/ModalContext";
import { FormFornecedor } from "../../../Forms/Fornecedores/FormFornecedor";

export function ModalAddFornecedor() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();

   const handleRegisterFornecedor = async (fornecedorData) => {
      // LOGICA PENDENTE
      try {
         console.log(fornecedorData);
         showSuccessAlert({
            title: "Fornecedor Cadastrado com Sucesso!"
         });
         closeModal();

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