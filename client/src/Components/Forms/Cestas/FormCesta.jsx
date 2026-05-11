import { useEffect, useEffectEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useModal } from "../../../Context/ModalContext";
import { useAlert } from "../../../Context/AlertContext";
import { Loading } from "../../Loading/Loading";
import { InputDefault } from "../../Input/InputDefault/InputDefault";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";
import { TableCesta } from "../../Table/TableCesta/TableCesta";
import styles from "./FormCesta.module.css";
import { InputMoney } from "../../Input/InputMoney/InputMoney";
import { getAllProdutosForSelectService, getProdutoByIdService } from "../../../Services/produtos.service";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";
import TableDefault from "../../Table/TableDefault/TableDefault";

export function FormCesta({ dataCesta, handleCestaSubmit }) {
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
         quantidade: null,
         cesta_itens: []
      },
   });

   const watchCestaItens = watch("cesta_itens"); 

   const registerNomeCesta = register("nome_cesta", {
      required: "Campo Obrigatório"
   });
   const registerQuantidade = register("quantidade", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: {
         value: 1,
         message: "Insira um valor maior que 0"
      }
   })

   const { field, append, remove } = useFieldArray({ control, name: "cesta_itens" });

   //LOGICA PENDENTE
   const defineOptionsProdutos = async (idProdutosCollection) => {
      try {
         const res = await getAllProdutosForSelectService(idProdutosCollection);
         setOptionsProdutos(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   // LOGICA PENDENTE
   const handleSelectProduto = async ({ produtoId }) => {
      try {
         setIsLoading(true);
         const resProduto = await getProdutoByIdService(produtoId);
         const produtoSelected = resProduto.data;
         if(produtoSelected) {
            append({
               fk_id_produto: produtoSelected.id,
               nome_produto: produtoSelected.nome_produto,
               tipo_unidade: produtoSelected.tipo_unidade,
               quantidade_estoque: produtoSelected.quantidade_estoque,
               quantidade_solicitada: null,
            });

            setIdExcludes((oldArr) => [...oldArr, produtoId]);
            resetSelect();
         }
         
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   const validateAndSubmit = async (data) => {
      if(dataCesta) {
         const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, {
            nome_cesta: data.nome_cesta,
            preco: data.preco,
            quantidade: data.quantidade
         });
         handleCestaSubmit(fieldsModifiedOnly);
      } else {
         handleCestaSubmit(data);
      }
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
         onSubmit={handleSubmit(validateAndSubmit)}
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
               <InputMoney
                  id="preco"
                  controlName="preco"
                  control={control}
                  placeholder="ex: 240.50"
                  textView="Preço*"
                  error={errors?.preco}
               />
               <InputDefault
                  type="number"
                  id="quantidade"
                  placeholder="ex: 10"
                  textView="Quantidade*"
                  register={registerQuantidade}
                  error={errors?.quantidade}
               />
            </div>
            <div className={styles.formCestaContent__rightSide}>
               {!dataCesta && (
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
               )}
               <div className={styles.produtoViewContainer}>
                  {errors?.cesta_itens && (
                     <p className={`${styles.customErrorMessage} fadeIn`}>
                        Uma ou mais quantidades inválidas
                     </p>
                  )}
                  {Array.isArray(watchCestaItens) && watchCestaItens.length === 0
                     ? <p className="">Nenhum Produto Selecionado</p>
                     : (!dataCesta ? (
                        <TableCesta
                           dataCollection={watchCestaItens}
                           register={register}
                           errors={errors}
                           removeProduto={handleRemoveProduto}
                        />
                     ) : (
                        <TableDefault
                           title="Itens na Cesta"
                           dataCollection={watchCestaItens}
                           fieldCollection={["Produto", "Tipo de Unidade", "Quantidade Atual", "Quantidade na Cesta"]}
                           isModalChildren={true}
                        />
                     ))
                  }
               </div>
            </div>
         </div>
         <div className="footerButtonContainerForForm">
               <button
                  className={`buttonFormMain-style1 ${
                     ((!dataCesta && watchCestaItens?.length === 0) || (dataCesta && !isDirty)) ? "buttonFormMain-style1__inactive" : ""
                  }`}
               >
                  Cadastrar Entrada
               </button>
            </div>
      </form>
   );
}
