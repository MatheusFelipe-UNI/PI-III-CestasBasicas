import { useForm } from "react-hook-form";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";
import { useHookFormMask } from "use-mask-input";
import { InputDefault } from "../../Input/InputDefault/InputDefault";

export function FormFornecedor({ dataFornecedor, handleFornecedorSubmit, handleCancel }) {
   const {
      register,
      handleSubmit,
      formState: { errors, isDirty, dirtyFields }
   } = useForm({
      defaultValues: dataFornecedor || {
         nome_fornecedor: "",
         cnpj: ""
      }
   })

   const registerNomeFornecedor =  register("nome_fornecedor", {
      required: "Campo Obrigatório"
   });

   const registerCnpjWithMask = useHookFormMask(register);

   const registerCnpj = registerCnpjWithMask("cnpj", ["99.999.999/0001-99"], {
      required: "campo Obrigatório",
   });

   const validateAndSubmit = (data) => {
      if(dataFornecedor) {
         const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, data);
         handleFornecedorSubmit(fieldsModifiedOnly);
      } else {
         handleFornecedorSubmit(data);
      }
   }

   return(
      <form 
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(validateAndSubmit)}
      >
         <InputDefault 
            type="text"
            id="nomeFornecedor"
            placeholder="Informe o fornecedor..."
            textView="Nome do Fornecedor*"
            register={registerNomeFornecedor}
            error={errors?.nome_fornecedor}
         />
         <InputDefault 
            type="text"
            id="cnpj"
            placeholder="Informe o CNPJ..."
            textView="CNPJ*"
            register={registerCnpj}
            error={errors?.cnpj}
         />
         <div className="footerButtonContainerForForm">
               <button className={`buttonFormSec-style1`} onClick={handleCancel}>Cancelar</button>

               <button className={`buttonFormMain-style1 ${
               dataFornecedor && isDirty ? "buttonFormMain-style1__inactive" : ""
            }`}>
               {dataFornecedor ? "Confirmar Alterações" : "Cadastrar Fornecedor"}
            </button>
         </div>
      </form>
   )
}