import { useForm } from "react-hook-form";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";
import { InputDefault } from "../../Input/InputDefault/InputDefault";
import { useHookFormMask } from "use-mask-input";
import InputRadio from "../../Input/InputRadio/InputRadio";
import { useEffect } from "react";

export function FormCliente({ dataCliente, handleClienteSubmit, handleCancel }) {
   const {
      register,
      handleSubmit,
      resetField,
      watch,
      setValue,
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
   const watchCpfCnpj = watch("cpf_cnpj");
   const registerWithMask = useHookFormMask(register);

   const registerNomeCliente = register("nome_cliente", {
      required: "Campo Obrigatório",
   });

   const registerTelefone = registerWithMask("telefone", ["(99) 999999999"], {
      required: "campo Obrigatório",
   });

   const registerTipoCliente = register("tipo_cliente", {
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

   // Limpa o campo CPF CNPJ toda vez que o tipo de cliente for alterado
   useEffect(() => {
      if((!dataCliente && (watchTipoCliente !== "" && watchCpfCnpj !== "")) ||
         (dataCliente && dataCliente?.tipo_cliente !== watchTipoCliente)
      ) {
         setValue("cpf_cnpj", "");
      }
   }, [watchTipoCliente])

   return (
      <form
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(validateAndSubmit)}
      >
         <InputDefault
            type="text"
            id="nomeCliente"
            placeholder="ex: Claudio Pereira"
            textView="Cliente*"
            register={registerNomeCliente}
            error={errors?.nome_cliente}
         />
         <InputDefault
            type="text"
            id="telefone"
            placeholder="ex: 14995821423"
            textView="Telefone/Celular*"
            register={registerTelefone}
            error={errors?.telefone}
         />
         <div className={"radioContainer"}>
            <h4 style={errors?.tipo_cliente ? { color: "var(--colorRed)" } : {}}>Tipo de Cliente*</h4>

            <div className="radioCollection">
               <InputRadio
                  id="pessoaFisica"
                  value="PESSOA_FISICA"
                  textView="Pessoa Física"
                  register={registerTipoCliente}
               />
               <InputRadio
                  id="pessoaJuridica"
                  value="PESSOA_JURIDICA"
                  textView="Pessoa Jurídica"
                  register={registerTipoCliente}
               />
            </div>
         </div>
         {
            watchTipoCliente === "PESSOA_FISICA"
               ? <InputDefault
                     type="text"
                     id="cpfCnpj"
                     placeholder="Informe o CPF"
                     textView="CPF*"
                     register={{...registerWithMask("cpf_cnpj", ["999.999.999-99"], {
                        required: "Campo Obrigatório"
                     })}}
                     error={errors?.cpf_cnpj}
                 />
               : watchTipoCliente === "PESSOA_JURIDICA" 
                  ?  <InputDefault
                        type="text"
                        id="cpfCnpj"
                        placeholder="Informe o CNPJ"
                        textView="CNPJ*"
                        register={{...registerWithMask("cpf_cnpj", ["99.999.999/9999-99"], {
                           required: "Campo Obrigatório"
                        })}}
                        error={errors?.cpf_cnpj}
                     />
                  :  <InputDefault
                        type="text"
                        id="cpfCnpj"
                        placeholder="Selecione o TIPO DE CLIENTE primeiro..."
                        textView="CPF/CNPJ"
                        disabled={true}
                        register={{...register("cpf_cnpj", {
                           validate: () => watchTipoCliente === "" || "Selecione o Tipo de Cliente..."
                        })}}
                        error={errors?.cpf_cnpj}
                     />
         }
         <div className="footerButtonContainerForForm">
            <button className={`buttonFormSec-style1`} onClick={handleCancel}>
               Cancelar
            </button>

            <button
               className={`buttonFormMain-style1 ${
                  dataCliente && !isDirty ? "buttonFormMain-style1__inactive" : ""
               }`}
            >
               {dataCliente ? "Confirmar Alterações" : "Cadastrar Cliente"}
            </button>
         </div>
      </form>
   );
}
