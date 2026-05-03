import { useForm } from "react-hook-form";
import { useAlert } from "../../../../Context/AlertContext";
import styles from "./FormUserPasswordChange.module.css";
import InputDefaultPassword from "../../../Input/InputDefaultPassword/InputDefaultPassword";

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
         <InputDefaultPassword
            type="text"
            id="currPassword"
            placeholder="Senha Atual"
            textView="Senha Atual*"
            register={registerCurrPass}
            error={errors?.currPassword}
         />
         <InputDefaultPassword
            type="text"
            id="newPassword"
            placeholder="Nova Senha"
            textView="Nova Senha*"
            register={registerNewPass}
            error={errors?.newPassword}
         />
         <InputDefaultPassword
            type="text"
            id="confirmNewPass"
            placeholder="Confirme a Nova Senha"
            textView="Confirme a Nova Senha*"
            register={registerConfirmNewPass}
            error={errors?.confirmNewPassword}
         />
         <button className="buttonForm-style1">Alterar Senha</button>
      </form>
   );   
}