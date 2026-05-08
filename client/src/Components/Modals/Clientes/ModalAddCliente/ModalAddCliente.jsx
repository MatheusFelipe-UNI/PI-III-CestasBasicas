import { useAlert } from "../../../../Context/AlertContext";
import { useCliente } from "../../../../Context/ClientesContext";
import { useModal } from "../../../../Context/ModalContext";
import { FormCliente } from "../../../Forms/Clientes/FormCliente";

export function ModalAddCliente() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { createCliente } = useCliente();

   const handleRegisterCliente = async ({ nome_cliente, telefone, tipo_cliente, cpf_cnpj }) => {
      try {
         if (!nome_cliente || !telefone || !tipo_cliente || !cpf_cnpj) {
            showErrorAlert({
               title: "Erro ao Cadastrar Cliente",
               message: "Um ou mais campos vazios!",
            });
         }

         if (await createCliente({ nome_cliente, telefone, tipo_cliente, cpf_cnpj })) {
            showSuccessAlert({
               title: "Cliente Cadastrado com Sucesso!",
            });
            closeModal();
         }
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

   return <FormCliente handleClienteSubmit={handleRegisterCliente} handleCancel={closeModal} />;
}
