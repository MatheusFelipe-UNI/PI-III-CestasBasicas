import { useForm, Controller } from "react-hook-form";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";
import { InputDefault } from "../../Input/InputDefault/InputDefault";
import { useHookFormMask } from "use-mask-input";
import { getAllFornecedoresForSelect } from "../../../Services/fornecedores.service";
import { useState } from "react";
import { useEffect } from "react";
import { useEffectEvent } from "react";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";
import CurrencyInput from "react-currency-input-field";
import { InputMoney } from "../../Input/InputMoney/InputMoney";

export function FormLoteProdutos({
   nome_produto = "",
   dataLoteProduto,
   handleLoteProdutoSubmit,
   handleCancel,
}) {
   const [fornecedoresOptions, setFornecedoresOptions] = useState([]);
   const {
      control,
      register,
      handleSubmit,
      formState: { errors, isDirty, dirtyFields },
   } = useForm({
      defaultValues: dataLoteProduto || {
         nome_produto: nome_produto || "",
         fk_id_fornecedor: null,
         valor_unitario: null,
         qtd_disponivel: null,
         data_validade: "",
      },
   });

   const registerWithMask = useHookFormMask(register);

   const registerQtdDisponivel = register("qtd_disponivel", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: {
         value: 0,
         message: "Insira um valor maior ou igual a 0",
      },
   });

   const registerDataValidade = registerWithMask("data_validade", ["99/99/9999"], {
      required: "Campo Obrigatório",
   });

   const validateAndSubmit = (data) => {
      if (dataLoteProduto) {
         const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, data);
         handleLoteProdutoSubmit(fieldsModifiedOnly);
      } else {
         handleLoteProdutoSubmit(data);
      }
   };

   const defineOptionsFornecedor = async () => {
      try {
         const res = await getAllFornecedoresForSelect();
         setFornecedoresOptions(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   const onDefineOptionsFornecedor = useEffectEvent(() => defineOptionsFornecedor());

   useEffect(() => {
      onDefineOptionsFornecedor();
   }, []);

   return (
      <form
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(validateAndSubmit)}
      >
         <InputDefault
            type="text"
            id="nome_produto"
            placeholder="Nome do Produto"
            disabled={true}
            textView="Produto"
            register={register("nome_produto")}
            error={errors?.nome_produto}
         />
         <SelectSearchable
            controlName="fk_id_fornecedor"
            control={control}
            dataOptions={fornecedoresOptions}
            textView="Fornecedor*"
            placeholder="Selecione um Fornecedor"
            error={errors?.fk_id_fornecedor}
         />
         <div className="inputCollection__dual">
            <InputMoney
               id="valor_unitario"
               controlName="valor_unitario"
               control={control}
               placeholder="ex: 12.50"
               textView="Valor Unitário*"
               error={errors?.valor_unitario}
            />
            <InputDefault
               type="number"
               id="qtd_disponivel"
               placeholder="ex: 10"
               textView="Quantidade Disponível*"
               register={registerQtdDisponivel}
               error={errors?.qtd_disponivel}
            />
         </div>
         <InputDefault
            type="text"
            id="data_validade"
            placeholder="ex: 01/01/2022"
            textView="Data de Validade*"
            register={registerDataValidade}
            error={errors?.data_validade}
         />
         <div className="footerButtonContainerForForm">
            <button className="buttonFormSec-style1" onClick={handleCancel}>
               Cancelar
            </button>
            <button
               className={`buttonFormMain-style1 ${
                  dataLoteProduto && !isDirty ? "buttonFormMain-style1__inactive" : ""
               }`}
            >
               {dataLoteProduto ? "Confirmar Alterações" : "Cadastrar Lote de Produto"}
            </button>
         </div>
      </form>
   );
}
