import { useAlert } from "../../../Context/AlertContext";
import { useModal } from "../../../Context/ModalContext";
import { registerNewUser } from "../../../services/admin.service";
import { FormAddUser } from "../../Forms/Administradores/FormAddUser";

export function ModalAddUser() {
   const { showConfirmAlert, showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { getAllUsers } = showDataInfo();


   const handleRegisterUser = async ({ usuario, senha, nivel_acesso }) => {
      if (!usuario || !senha || !nivel_acesso) {
         return showErrorAlert({
            title: "Erro ao cadastrar Usuário",
            message: "Um ou mais campos não foram devidamente preenchidos",
         });
      }
      try {
         const res = await registerNewUser({ usuario, senha, nivel_acesso })
         console.log(res);

         if(res.data.status === "success" || res.status === 201) {
            showSuccessAlert({
               title: "Cadastro Concluído",
               message: "O usuário foi cadastrado com Sucesso.",
            });

            closeModal();
         }
         
      } catch (error) {
        console.log(error);
        if(error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
                title: "Erro ao Cadastrar Novo Usuário",
                message: errMessage
            })
        }
      }
   };

   const handleConfirmRegister = (data) => {
      showConfirmAlert({
         title: "Criação de Usuário",
         message: "Você está prestes a criar um novo Usuário. Está certo disso?",
         handleConfirm: () => handleRegisterUser(data),
      });
   };

   return(
      <FormAddUser handleUserSubmit={handleConfirmRegister} handleCancel={closeModal}/>
   )
}