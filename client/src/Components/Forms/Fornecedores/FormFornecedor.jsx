import { useForm } from "react-hook-form";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";

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

   const registerCnpj = register("cnpj", {
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
         <div>
            <label htmlFor="nome_fornecedor">Nome do Fornecedor*</label>
            <input type="text" {...registerNomeFornecedor}/>
         </div>
         <div>
            <label htmlFor="cnpj">CNPJ*</label>
            <input type="text" {...registerCnpj}/>
         </div>
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