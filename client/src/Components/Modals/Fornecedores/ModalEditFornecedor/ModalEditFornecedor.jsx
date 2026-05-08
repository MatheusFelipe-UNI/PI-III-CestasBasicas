import { useEffect, useEffectEvent, useState } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import { useFornecedor } from "../../../../Context/FornecedoresContext";
import { useModal } from "../../../../Context/ModalContext"
import { getFornecedorByIdService } from "../../../../Services/fornecedores.service";
import { FormFornecedor } from "../../../Forms/Fornecedores/FormFornecedor";
import { Loading } from "../../../Loading/Loading";

export function ModalEditFornecedor() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { updateFornecedor } = useFornecedor();
   const { id } = showDataInfo();
   const [editableFornecedor, setEditableFornecedor] = useState();

   const getFornecedor = async () => {
      try {
         const res = await getFornecedorByIdService(id);
         const { nome_fornecedor, cnpj } = res.data;
         setEditableFornecedor({ nome_fornecedor, cnpj });
      } catch (error) {
         console.log(error);
      }
   }

   const handleSubmitFornecedor = async (newFornecedorData) => {
      try {
         if(await updateFornecedor(id, newFornecedorData)) {
            showSuccessAlert({
               title: "Fornecedor Editado com Sucesso!"
            });
            closeModal();
         }
      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao cadastrar Fornecedor",
               message: errMessage
            })
         }
      }
   }

   const onGetFornecedor = useEffectEvent(() => getFornecedor());

   useEffect(() => {
      onGetFornecedor();
   }, [])

   if(!editableFornecedor) {
      return <Loading/>
   }

   return(
      editableFornecedor && <FormFornecedor dataFornecedor={editableFornecedor} handleFornecedorSubmit={handleSubmitFornecedor} handleCancel={closeModal}/>
   )
}