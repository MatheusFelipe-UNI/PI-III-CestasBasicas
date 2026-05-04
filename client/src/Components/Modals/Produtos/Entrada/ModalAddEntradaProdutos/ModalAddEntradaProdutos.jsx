import { useEffect, useEffectEvent, useState } from "react";
import { useModal } from "../../../../../Context/ModalContext";
import { useAlert } from "../../../../../Context/AlertContext";
import { useFieldArray, useForm } from "react-hook-form";
import SelectSearchable from "../../../../SelectSearchable/SelectSearchable";
import { Loading } from "../../../../Loading/Loading";
import { TableAddEntradaProdutos } from "../../../../Table/TableAddEntradaProdutos/TableAddEntradaProdutos";
import styles from "./ModalAddEntradaProdutos.module.css";

export function ModalAddEntradaProdutos() {
   const [optionsProdutos, setOptionsProdutos] = useState([]);
   const [optionsFornecedores, setOptionsFornecedores] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [idExcludes, setIdExcludes] = useState([]);
   const { closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();

   //Hook form do produto
   const {
      control: controlSelect,
      reset: resetSelect,
      handleSubmit: handleSubmitSelect,
      formState: { errors: errorsSelect },
   } = useForm({
      defaultValues: {
         fornecedorId: null,
         produtoId: null,
      },
   });

   // Hook dos produtos selecionados
   const {
      control,
      register,
      watch,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const watchProdutos = watch("produtos");

   const {
      fields: fieldProdutos,
      append: appendProdutos,
      remove: removeProdutos,
   } = useFieldArray({ control, name: "produtos" });

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
   const defineOptionsFornecedores = async (fornecedoresCollection) => {
      try {
         setOptionsFornecedores([
            {
               label: "Fornecedor 1",
               value: 1,
            },
            {
               label: "Fornecedor 2",
               value: 2,
            },
            {
               label: "Fornecedor 3",
               value: 3,
            },
         ]);
      } catch (error) {
         console.log(error);
      }
   };

   // LOGICA PENDENTE
   const handleSelectEntrada = async ({ fornecedorId, produtoId }) => {
      try {
         setIsLoading(true);
         appendProdutos({
            id: produtoId,
            nome_produto: "Produto 1",
            fornecedor: "Claudio Pereira INC",
            tipo_unidade: "UN",
            quantidade_estoque: 20,
            quantidade_adquirida: null,
         });

         setIdExcludes((oldArr) => [...oldArr, produtoId]);
         resetSelect();
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   // LOGICA PENDENTE
   const handleAddEntrada = async ({ produtos }) => {
      if (Array.isArray(produtos) && produtos.length === 0) {
         showErrorAlert({
            title: "Erro ao Cadastrar Entrada",
            message: "Nenhum produto passado",
         });
      } else {
         try {
            console.log(produtos);

            showSuccessAlert({
               title: "Entrada Registrada com sucesso!",
               message: "O estoque dos produtos foi atualizado.",
            });
         } catch (error) {
            if (error?.response?.data) {
               const { errMessage } = error.response.data;

               showErrorAlert({
                  title: "Erro ao Cadastrar Entrada",
                  message: errMessage,
               });
            }
         }
      }
   };

   const handleRemoveProduto = (index) => {
      removeProdutos(index);
      const newExcludesId = [...idExcludes];
      (newExcludesId.splice(index, 1), setIdExcludes(newExcludesId));
   };

   const onDefineOptionsProdutos = useEffectEvent((idProdutosCollection) =>
      defineOptionsProdutos(idProdutosCollection),
   );

   const onDefineOptionsFornecedores = useEffectEvent(() => defineOptionsFornecedores());

   useEffect(() => {
      onDefineOptionsProdutos(idExcludes);
   }, [idExcludes]);

   useEffect(() => {
      onDefineOptionsFornecedores();
   }, []);

   if (!optionsProdutos || !optionsFornecedores) {
      return <Loading />;
   }

   console.log(watchProdutos);

   return (
      <>
         <form
            action=""
            className={styles.formSelectContainer}
            onSubmit={handleSubmitSelect(handleSelectEntrada)}
         >
            <SelectSearchable
               control={controlSelect}
               controlName="fornecedorId"
               dataOptions={optionsFornecedores}
               placeholder={"Selecione o Fornecedor..."}
               error={errorsSelect?.fornecedorId}
               customStyle={
                  Array.isArray(watchProdutos) && watchProdutos.length === 0 
                     ? { minWidth: "270px" }
                     : { width: "100%" }
               }
            />
            <SelectSearchable
               control={controlSelect}
               controlName="produtoId"
               dataOptions={optionsProdutos}
               placeholder={"Selecione o Produto..."}
               error={errorsSelect.produtoId}
               customStyle={
                  Array.isArray(watchProdutos) && watchProdutos.length === 0 
                     ? { minWidth: "270px" }
                     : { width: "100%" }
               }
            />
            <button
               disabled={isLoading}
               className={isLoading ? "buttonFormMain-style1__inactive" : ""}
            >
               {isLoading ? <Loading /> : "Adicionar"}
            </button>
         </form>
         <form
            action=""
            className={styles.formEntradaProdutosContainer}
            onSubmit={handleSubmit(handleAddEntrada)}
         >
            {errors?.produtos && (
               <p className={`${styles.customErrorMessage} fadeIn`}>Uma ou mais quantidades Inválidas</p>
            )}
            {Array.isArray(watchProdutos) && watchProdutos.length === 0 ? (
               <p className={styles.customNotAvailableText}>Nenhum Produto selecionado</p>
            ) : (
               <TableAddEntradaProdutos
                  dataCollection={watchProdutos}
                  register={register}
                  errors={errors}
                  removeProduto={handleRemoveProduto}
               />
            )}
            <div className="footerButtonContainerForForm">
               <button
                  className={`buttonFormMain-style1 ${
                     watchProdutos?.length === 0 ? "buttonFormMain-style1__inactive" : ""
                  }`}
               >
                  Cadastrar Entrada
               </button>
            </div>
         </form>
      </>
   );
}
