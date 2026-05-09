import { useEffect, useEffectEvent, useState } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import { useCliente } from "../../../../Context/ClientesContext";
import { useModal } from "../../../../Context/ModalContext";
import { getClienteByIdService } from "../../../../Services/clientes.service";
import { Loading } from "../../../Loading/Loading";
import { FormCliente } from "../../../Forms/Clientes/FormCliente";

export function ModalEditCliente() {
   const { showDataInfo, closeModal } = useModal();
   const {showSuccessAlert, showErrorAlert } = useAlert();
   const { updateCliente } = useCliente();
   const { id } = showDataInfo();
   const [editableCliente, setEditableCliente] = useState();

   const getCliente = async () => {
      try {
         const res = await getClienteByIdService(id);
         const { nome_cliente, cpf_cnpj, telefone, tipo_cliente } = res.data;
         setEditableCliente({ nome_cliente, cpf_cnpj, telefone, tipo_cliente })
      } catch (error) {
         console.log(error);
      }
   }

   const handleSubmitCliente = async (newClienteData) => {
      try {
         if(await updateCliente(id, newClienteData)) {
            showSuccessAlert({
               title: "Cliente Alterado com Sucesso!"
            })
            closeModal();
         }
      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao editar Cliente",
               message: errMessage
            })
         }
      }
   }

   const onGetCliente = useEffectEvent(() => getCliente());

   useEffect(() => {
      onGetCliente();
   }, [])

   if(!editableCliente) {
      return <Loading/>
   }

   return(
      editableCliente && (
         <FormCliente
            dataCliente={editableCliente}
            handleClienteSubmit={handleSubmitCliente}
            handleCancel={closeModal}
         />
      )
   )

}