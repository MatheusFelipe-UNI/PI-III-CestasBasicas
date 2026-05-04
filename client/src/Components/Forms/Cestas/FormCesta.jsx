import { useEffect, useEffectEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useModal } from "../../../Context/ModalContext";
import { useAlert } from "../../../Context/AlertContext";
import { Loading } from "../../Loading/Loading";
import { InputDefault } from "../../Input/InputDefault/InputDefault";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";
import { TableCesta } from "../../Table/TableCesta/TableCesta";
import styles from "./FormCesta.module.css";

export function FormCesta({ dataCesta }) {
   const [optionsProdutos, setOptionsProdutos] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [idExcludes, setIdExcludes] = useState([]);
   const { closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();

   const {
      control: controlSelect,
      reset: resetSelect,
      handleSubmit: handleSubmitSelect,
      formState: { errors: errorsSelect },
   } = useForm({
      defaultValues: {
         produtoId: null,
      },
   });

   const {
      control,
      register,
      watch,
      handleSubmit,
      formState: { errors, isDirty, dirtyFields },
   } = useForm({
      defaultValues: dataCesta || {
         nome_cesta: "",
         preco: null,
      },
   });

   const watchCestaItens = watch("cesta_itens"); 

   const registerNomeCesta = register("nome_cesta", {
      required: "Campo Obrigatório"
   });

   const registerPreco = register("preco", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: {
         value: 0,
         message: "O Preço deve ser maior ou igual a 0"
      }
   })

   const { field, append, remove } = useFieldArray({ control, name: "cesta_itens" });

   //LOGICA PENDENTE
   const defineOptionsProdutos = async (idProdutosCollection) => {
      try {
         setOptionsProdutos([
            {
               label: "Produto 1",
               value: 1,
            },
            {
               label: "Produto 2",
               value: 2,
            },
            {
               label: "Produto 3",
               value: 3,
            },
         ]);
      } catch (error) {
         console.log(error);
      }
   };

   // LOGICA PENDENTE
   const handleSelectProduto = async ({ produtoId }) => {
      try {
         setIsLoading(true);
         append({
            id: produtoId,
            nome_produto: "Produto 1",
            tipo_unidade: "UN",
            quantidade_estoque: 20,
            quantidade_solicitada: null,
         });

         setIdExcludes((oldArr) => [...oldArr, produtoId]);
         resetSelect();
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   const handleAddCesta = async (data) => {
      console.log(data);
   };

   const handleRemoveProduto = (index) => {
      remove(index);
      const newExcludesId = [...idExcludes];
      (newExcludesId.splice(index, 1), setIdExcludes(newExcludesId));
   };

   const onDefineOptionsProdutos = useEffectEvent((idProdutosCollection) =>
      defineOptionsProdutos(idProdutosCollection),
   );

   useEffect(() => {
      onDefineOptionsProdutos(idExcludes);
   }, [idExcludes]);

   if(!optionsProdutos) {
      return <Loading/>
   }

   return (
      <form 
         action="" 
         className={"layoutFormContentSpacing"}
         onSubmit={handleSubmit(handleAddCesta)}
      >
         <div className={styles.formCestaContainer}>
            <div className={styles.verticalLine}></div>
            <div className={styles.formCestaContent__leftSide}>
               <InputDefault
                  type="text"
                  id="nomeCesta"
                  placeholder="ex: Cesta Básica 1"
                  textView="Nome da Cesta*"
                  register={registerNomeCesta}
                  error={errors?.nome_cesta}
               />
               <InputDefault
                  type="number"
                  id="preco"
                  placeholder="ex: 240.50"
                  textView="Preço*"
                  register={registerPreco}
                  error={errors?.preco}
               />
            </div>
            <div className={styles.formCestaContent__rightSide}>
               <div className={styles.selectProdutoContainer}>
                  <SelectSearchable
                     control={controlSelect}
                     controlName="produtoId"
                     dataOptions={optionsProdutos}
                     placeholder={"Selecione o Produto..."}
                     textView="Produto*"
                     error={errorsSelect?.produtoId}
                     customStyle={{width: "100%"}}
                  />
                  <button
                     type="button"
                     onClick={handleSubmitSelect(handleSelectProduto)}
                     disabled={isLoading}
                     className={isLoading ? "buttonFormMain-style1__inactive" : ""}
                     style={errorsSelect?.produtoId ? { marginTop: "4px" } : { marginTop: "23px" }}
                  >
                     { isLoading ? <Loading/> : "Adicionar" }
                  </button>
               </div>
               <div className={styles.produtoViewContainer}>
                  {errors?.cesta_itens && (
                     <p className={`${styles.customErrorMessage} fadeIn`}>
                        Uma ou mais quantidades inválidas
                     </p>
                  )}
                  {Array.isArray(watchCestaItens) && watchCestaItens.length === 0
                     ? <p className="">Nenhum Produto Selecionado</p>
                     : <TableCesta
                           dataCollection={watchCestaItens}
                           register={register}
                           errors={errors}
                           removeProduto={handleRemoveProduto}
                        />
                  }
               </div>
            </div>
         </div>
         <div className="footerButtonContainerForForm">
               <button
                  className={`buttonFormMain-style1 ${
                     watchCestaItens?.length === 0 ? "buttonFormMain-style1__inactive" : ""
                  }`}
               >
                  Cadastrar Entrada
               </button>
            </div>
      </form>
   );
}
