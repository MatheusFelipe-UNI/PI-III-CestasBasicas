import { useForm } from "react-hook-form";

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
      min: {
         value: 0,
         message: "Insira um valor maior ou igual a 0",
      },
   });

   return (
      <form
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(handleUserSubmit)}
      >
         <div>
            <label htmlFor="usuario">Usuário*</label>
            <input type="text" {...registerUsuario} />
         </div>
         <div>
            <label htmlFor="senha">Senha*</label>
            <input type="text" {...registerSenha} />
         </div>
         <div>
            <h4>Nível de acesso</h4>
            <div>
               <label htmlFor="nivelAcesso">Administrador</label>
               <input type="radio" value={1} {...registerNivelAcesso}/>
            </div>
            <div>
               <label htmlFor="nivelAcesso">Funcionário</label>
               <input type="radio" value={2} {...registerNivelAcesso}/>
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
