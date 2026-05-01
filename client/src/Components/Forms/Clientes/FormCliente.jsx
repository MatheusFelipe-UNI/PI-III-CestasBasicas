import { useForm } from "react-hook-form";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";

export function FormCliente({ dataCliente, handleClienteSubmit, handleCancel }) {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isDirty, dirtyFields },
   } = useForm({
      defaultValues: dataCliente || {
         nome_cliente: "",
         telefone: "",
         tipo_cliente: "",
         cpf_cnpj: "",
      },
   });

   const watchTipoCliente = watch("tipo_cliente");

   const registerNomeCliente = register("nome_cliente", {
      required: "Campo Obrigatório",
   });

   const registerTelefone = register("telefone", {
      required: "campo Obrigatório",
   });

   const registerTipoCliente = register("tipo_cliente", {
      required: "campo Obrigatório",
   });

   const registerCpfCnpj = register("cpf_cnpj", {
      required: "campo Obrigatório",
   });

   const validateAndSubmit = (data) => {
      if (dataCliente) {
         const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, data);
         handleClienteSubmit(fieldsModifiedOnly);
      } else {
         handleClienteSubmit(data);
      }
   };

   return (
      <form
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(validateAndSubmit)}
      >
         <div>
            <label htmlFor="nome_cliente">Nome do Cliente*</label>
            <input type="text" {...registerNomeCliente} />
         </div>
         <div>
            <label htmlFor="telefone">Telefone/Celular*</label>
            <input type="text" {...registerTelefone} />
         </div>
         <div>
            <label htmlFor="quantidade_estoque">Tipo de Cliente*</label>
            <input
               type="radio"
               id="pessoa_fisica"
               value={"PESSOA_FISICA"}
               {...registerTipoCliente}
            />
            <input
               type="radio"
               id="pessoa_juridica"
               value={"PESSOA_JURIDICA"}
               {...registerTipoCliente}
            />
         </div>
         <div>
            <label htmlFor="cpf_cnpj">
               {watchTipoCliente === "PESSOA_FISICA"
                  ? "CPF"
                  : watchTipoCliente === "PESSOA_JURIDICA"
                    ? "CNPJ"
                    : "CPF/CNPJ"}
            </label>
            <input
               type="text"
               {...registerCpfCnpj}
               placeholder={
                  watchTipoCliente === "PESSOA_FISICA" 
                     ? "Informe o CPF" 
                     : "Informe o CNPJ"
               }
               disabled={watchTipoCliente === ""}
            />
         </div>
         <div className="footerButtonContainerForForm">
            <button className={`buttonFormSec-style1`} onClick={handleCancel}>
               Cancelar
            </button>

            <button
               className={`buttonFormMain-style1 ${
                  dataCliente && isDirty ? "buttonFormMain-style1__inactive" : ""
               }`}
            >
               {dataCliente ? "Confirmar Alterações" : "Cadastrar Cliente"}
            </button>
         </div>
      </form>
   );
}
