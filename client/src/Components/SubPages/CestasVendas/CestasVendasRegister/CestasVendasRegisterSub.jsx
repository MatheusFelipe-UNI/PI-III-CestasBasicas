import { useEffect, useEffectEvent, useState } from "react";
import SelectSearchable from "../../../SelectSearchable/SelectSearchable";
import styles from "./CestasVendasRegisterSub.module.css";
import { useAlert } from "../../../../Context/AlertContext";
import { useModal } from "../../../../Context/ModalContext";
import { useFieldArray, useForm } from "react-hook-form";
import { Loading } from "../../../Loading/Loading";
import { TableCestaVendas } from "../../../Table/TableCestaVendas/TableCestaVendas";
import { getAllClientesForSelectService, getAllClientesService, getClienteByIdService } from "../../../../Services/clientes.service";
import { getAllCestasForSelectService, getCestaByIdService } from "../../../../Services/cesta.service";
import { useVendaCesta } from "../../../../Context/VendaCestaContext";

export function CestasVendasRegisterSub() {
   const [optionsClientes, setOptionsClientes] = useState([]);
   const [optionsCestas, setOptionsCestas] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [idExcludes, setIdExcludes] = useState([]);
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { createVendaCesta } = useVendaCesta();
   const { closeModal } = useModal();

   // Hook dos selects
   const {
      control: controlSelect,
      reset: resetSelect,
      resetField: resetFieldSelect,
      handleSubmit: handleSubmitSelect,
      formState: { errors: errorsSelect }
   } = useForm({
      defaultValues: {
         clientId: null,
         cestaId: null
      }
   })

   // Hook das cestas selecionadas
   const {
      control,
      register,
      reset: resetCestas,
      watch,
      setValue,
      handleSubmit,
      formState: { errors },
      } = useForm({
         defaultValues: {
            cestas: []
         }
      });

   const watchCestas = watch("cestas");

   const {
      fields: fieldsCestas,
      append: appendCestas,
      remove: removeCestas,
   } = useFieldArray({
      control,
      name: "cestas",
   })

   const defineOptionsClientes = async () => {
      try {
         const res = await getAllClientesForSelectService();
         setOptionsClientes(res.data);
      } catch (error) {
         console.log(error);
      }
   }

   const defineOptionsCesta = async (cestaCollection) => {
      try {
         const res = await getAllCestasForSelectService(cestaCollection);
         setOptionsCestas(res.data);
      } catch (error) {
         console.log(error);
      }
   }

   const resetAllFields = () => {
      resetCestas();
      resetSelect();
      setIdExcludes([]);
   }

   const handleSelectVenda = async ({ clienteId, cestaId }) => {
      try {
         setIsLoading(true);
         const resCesta = await getCestaByIdService(cestaId);
         const resCliente = await getClienteByIdService(clienteId);
         appendCestas({
            fk_id_cliente: resCliente.data.id,
            fk_id_cesta: resCesta.data.id,
            nome_cliente: resCliente.data.nome_cliente,
            nome_cesta: resCesta.data.nome_cesta,
            valor_unitario: resCesta.data.preco,
            quantidade: resCesta.data.quantidade,
            quantidade_solicitada: null,
            valor_total: null
         });

         setIdExcludes((oldArr) => [...oldArr, cestaId]);
         resetFieldSelect("cestaId");
         setIsLoading(false);

      } catch (error) {
         console.log(error);
      }
   }

   const handleAddVenda = async (data) => {
      if(await createVendaCesta({vendaCollection: data.cestas})) {
         showSuccessAlert({
            title: "Solicitação Cadastrada!",
            message: "O cadastro da solicitação de venda foi realizada com sucesso. Para visualizar a solicitação e confirmar a retirada, acesse a aba de solicitações de vendas."
         });
         closeModal();
         resetAllFields();
      }
   }

   const handleRemoveProduto = (index) => {
      removeCestas(index);
      const newExcludesId = [...idExcludes];
      (newExcludesId.splice(index, 1), setIdExcludes(newExcludesId));
   };

   const onDefineOptionsClientes = useEffectEvent(() => defineOptionsClientes());

   const onDefineOptionsCestas = useEffectEvent((idCestaCollection) => defineOptionsCesta(idCestaCollection));

   useEffect(() => {
      onDefineOptionsCestas(idExcludes)
   }, [idExcludes]);

   useEffect(() => {
      onDefineOptionsClientes();
   }, []);

   if(!optionsClientes || !optionsCestas) {
      return <Loading/>
   }

   return(
      <form 
         action=""
         onSubmit={handleSubmit(handleAddVenda)}
      >
         <div className={styles.registerVendaContent__selectContainer}>
            <SelectSearchable
               control={controlSelect}
               controlName="clienteId"
               dataOptions={optionsClientes}
               placeholder={"Selecione o Cliente..."}
               error={errorsSelect?.clienteId}
               customStyle={{width: "100%"}}
            />
            <SelectSearchable
               control={controlSelect}
               controlName="cestaId"
               dataOptions={optionsCestas}
               placeholder={"Selecione a Cesta..."}
               error={errorsSelect?.cestaId}
               customStyle={{width: "100%"}}
            />
            <button 
               type="button" 
               onClick={handleSubmitSelect(handleSelectVenda)}>
                  Adicionar
            </button>
         </div>
         {errors?.cestas && (
            <p className={`${styles.customErrorMessage} fadeIn`}>
               Uma ou mais quantidades inválidas
            </p>
         )}
         { Array.isArray(watchCestas) && watchCestas.length === 0 ? (
            <p className="textInfoNotAvaliable">Nenhuma Cesta Selecionada</p>
         ) : (
            <TableCestaVendas
               dataCollection={watchCestas}
               register={register}
               watch={watch}
               setValue={setValue}
               errors={errors}
               removeCesta={handleRemoveProduto}
            />
         )}

         <button className={
            `${styles.cestaVendaContent__button}
            ${(watchCestas.length === 0 ? "buttonFormMain-style1__inactive" : "")}`
         }>
            Cadastrar Venda
         </button>
      </form>
   )
}