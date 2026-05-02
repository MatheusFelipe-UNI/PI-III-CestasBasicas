import { useForm } from "react-hook-form";
import { useAlert } from "../../../../Context/AlertContext";
import styles from "./FormUserPasswordChange.module.css";

export function FormUserPasswordChange() {
  const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         currPassword: "",
         newPassword: "",
         confirmNewPassword: "",
      },
   });

   const { showSuccessAlert, showErrorAlert } = useAlert();

   const registerCurrPass = register("currPassword", {
      required: "Campo Obrigatório",
   });

   const registerNewPass = register("newPassword", {
      required: "Campo Obrigatório",
   });
   const watchNewpass = watch("newPassword");
   const registerConfirmNewPass = register("confirmNewPassword", {
      required: "Campo Obrigatório",
      validate: (value) => value === watchNewpass || "As senhas não são iguais!"
   });


   // LOGICA PENDENTE
   const handleChangePassword = async ({ currPassword, newPassword, confirmNewPassword }) => {
      try {
         if(newPassword !== confirmNewPassword) {
            showErrorAlert({
               title: "Erro ao Atualizar a senha",
               message: "A senhas não coincidem!"
            })
         }

         showSuccessAlert({
            title: "Senha Alterada com Sucesso!",
            message: "Efetue novamente o login com a sua nova senha"
         })
         reset();

      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { code, errMessage } = error.response.data;

            if(code === "CANNOT_UPDATE_DATA") {
               showErrorAlert({
                  title: "Erro ao Atualizar Senha",
                  message: errMessage
               })

            } else {
               showErrorAlert({
                  title: "Erro",
                  message: errMessage
               })
            }
         }
      }

      
   }

   return (
      <form 
         action="" 
         className={`layoutFormContentSpacing ${styles.formUserChangePassword}`}
         onSubmit={handleSubmit(handleChangePassword)}
      >
         <h3>Alterar Senha</h3>
         <div>
            <label htmlFor="currPassword">Senha Atual*</label>
            <input
               type="text"
               id="currPassword"
               placeholder="Senha Atual"
               {...registerCurrPass}
            />
         </div>
         <div>
            <label htmlFor="newPassword">Nova Senha*</label>
            <input
               type="text"
               id="newPassword"
               placeholder="Nova Senha"
               {...registerNewPass}
            />
         </div>
         <div>
            <label htmlFor="confirmNewPass">Confirme a Nova Senha*</label>
            <input
               type="text"
               id="confirmNewPass"
               placeholder="Confirme a Nova Senha"
               {...registerConfirmNewPass}
            />
         </div>
         <button className="buttonForm-style1">Alterar Senha</button>
      </form>
   );   
}