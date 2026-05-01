import { useAlert } from "../../../Context/AlertContext";
import { useModal } from "../../../Context/ModalContext";
import { FormCliente } from "../../Forms/Clientes/FormCliente";

export function ModalAddCliente() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();

   const handleRegisterCliente = async (clienteData) => {
      // LOGICA PENDENTE
      try {
         console.log(clienteData);
         showSuccessAlert({
            title: "Cliente Cadastrado com Sucesso!",
         });
         closeModal();
      } catch (error) {
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Cadastrar Cliente",
               message: errMessage,
            });
         }
      }
   };

   return(
      <FormCliente handleClienteSubmit={handleRegisterCliente} handleCancel={closeModal}/>
   )
}
