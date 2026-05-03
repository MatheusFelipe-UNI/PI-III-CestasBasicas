import { useForm } from "react-hook-form";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";
import { InputDefault } from "../../Input/InputDefault/InputDefault";

export function FormProduto({ dataProduto, handleProdutoSubmit, handleCancel }) {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isDirty, dirtyFields }
   } = useForm({
      defaultValues: dataProduto || {
         nome_produto: "",
         unidade: "",
         quantidade_estoque: null,
         estoque_minimo: null
      }
   })

   const registerNomeProduto =  register("nome_produto", {
      required: "Campo Obrigatório"
   });

   const registerUnidade = register("unidade", {
      required: "campo Obrigatório",
   });

   const registerQtdEstoque = register("quantidade_estoque", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: {
         value: 0,
         message: "Insira um valor maior ou igual a 0"
      }
   });

   const registerQtdEstoqueMinimo = register("estoque_minimo", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: {
         value: 0,
         message: "Insira um valor maior ou igual a 0"
      }
   });

   const validateAndSubmit = (data) => {
      if(dataProduto) {
         const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, data);
         handleProdutoSubmit(fieldsModifiedOnly);
      } else {
         handleProdutoSubmit(data);
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
            id="nomeProduto"
            placeholder="ex: Arroz Safra sul"
            textView="Produto*"
            register={registerNomeProduto}
            error={errors?.nome_produto}
         />
         <InputDefault
            type="text"
            id="unidade"
            placeholder="ex: UN, KG, L etc."
            textView="Tipo de Unidade*"
            register={registerUnidade}
            error={errors?.unidade}
         />
         <div className="inputCollection__dual">
            <InputDefault
               type="number"
               id="qtdEstoque"
               placeholder="ex: 20"
               textView="Qtd. no Estoque*"
               register={registerQtdEstoque}
               error={errors?.quantidade_estoque}
            />
            <InputDefault
               type="number"
               id="qtdEstoqueMinimo"
               placeholder="ex: 5"
               textView="Qtd. Mínimo no Estoque*"
               register={registerQtdEstoqueMinimo}
               error={errors?.estoque_minimo}
            />
         </div>
         <div className="footerButtonContainerForForm">
            <button className={`buttonFormSec-style1`} onClick={handleCancel}>Cancelar</button>

            <button className={`buttonFormMain-style1 ${
               dataProduto && isDirty ? "buttonFormMain-style1__inactive" : ""
            }`}>
               {dataProduto ? "Confirmar Alterações" : "Cadastrar Produto"}
            </button>
         </div>
      </form>
   )
}