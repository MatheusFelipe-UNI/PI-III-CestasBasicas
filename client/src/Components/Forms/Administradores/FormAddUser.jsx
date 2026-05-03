import { useForm } from "react-hook-form";
import { InputDefault } from "../../Input/InputDefault/InputDefault";
import InputRadio from "../../Input/InputRadio/InputRadio";
import InputDefaultPassword from "../../Input/InputDefaultPassword/InputDefaultPassword";

export function FormAddUser({ handleUserSubmit, handleCancel }) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         usuario: "",
         senha: "",
         nivel_acesso: null,
      },
   });

   const registerUsuario = register("usuario", {
      required: "Campo Obrigatório!",
   });

   const registerSenha = register("senha", {
      required: "Campo Obrigatório",
   });

   const registerNivelAcesso = register("nivel_acesso", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
   });

   return (
      <form
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(handleUserSubmit)}
      >
         <InputDefault
            type="text"
            id="usuario"
            placeholder="ex: claudio.pereira"
            textView="Usuário*"
            register={registerUsuario}
            error={errors?.usuario}
         />
         <InputDefaultPassword
            type="text"
            id="senha"
            placeholder="Informe a senha..."
            textView="Senha*"
            register={registerSenha}
            error={errors?.senha}
         />
         <div className="radioContainer">
            <h4 style={errors?.nivel_acesso ? { color: "var(--colorRed)" } : {}}>Nível de Acesso*</h4>

            <div className="radioCollection">
               <InputRadio
                  id={"admin"}
                  value={"1"}
                  textView="Administrador"
                  register={registerNivelAcesso}
               />
               <InputRadio
                  id={"funcionario"}
                  value={"2"}
                  textView="Funcionário"
                  register={registerNivelAcesso}
               />
            </div>
         </div>
         <div className="footerButtonContainerForForm">
            <button className={`buttonFormSec-style1`} onClick={handleCancel}>
               Cancelar
            </button>

            <button
               className={`buttonFormMain-style1`}
            >
               Cadastrar Uusário
            </button>
         </div>
      </form>
   );
}
