import { useForm } from "react-hook-form";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";

export function FormProduto({ dataProduto, handleProdutoSubmit }) {
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
         <div>
            <label htmlFor="nome_produto">Nome do Produto</label>
            <input type="text" {...registerNomeProduto}/>
         </div>
         <div>
            <label htmlFor="unidade">Tipo Unidade</label>
            <input type="text" {...registerUnidade}/>
         </div>
         <div>
            <label htmlFor="quantidade_estoque">Quantidade no Estoque</label>
            <input type="text" {...registerQtdEstoque}/>
         </div>
         <div>
            <label htmlFor="estoque_minimo">Estoque Mínimo</label>
            <input type="text" {...registerQtdEstoqueMinimo}/>
         </div>
         <div className="footerButtonContainerForForm">
               <button className={`buttonFormMain-style1 ${
               dataProduto && isDirty ? "buttonFormMain-style1__inactive" : ""
            }`}>
               {dataProduto ? "Confirmar Alterações" : "Cadastrar Produto"}
            </button>
         </div>
      </form>
   )
}