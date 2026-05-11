import { useEffect, useEffectEvent, useState } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import { useCesta } from "../../../../Context/CestaContext";
import { useModal } from "../../../../Context/ModalContext";
import { FormCesta } from "../../../Forms/Cestas/FormCesta";
import { getCestaByIdService } from "../../../../Services/cesta.service";
import { Loading } from "../../../Loading/Loading";

export function ModalEditCesta() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { updateCesta } = useCesta();
   const { id } = showDataInfo();
   const [editableCesta, setEditableCesta] = useState();

   const getCesta = async () => {
      try {
         const res = await getCestaByIdService(id);
         const {
            nome_cesta,
            preco,
            quantidade,
            itens_cesta
         } = res.data;
         setEditableCesta({
            nome_cesta,
            preco,
            quantidade,
            cesta_itens: itens_cesta
         });
      } catch (error) {
         console.log(error);
      }
   }

   const handleSubmitCesta = async (newCestaData) => {
      try {
         if(await updateCesta(id, newCestaData)) {
            showSuccessAlert({ 
               title: "Cesta Atualizada com sucesso!" 
            });
            closeModal();
         }
      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
               title: "Erro ao editar Cesta",
               message: errMessage
            })
         }
      }
   }

   const onGetCesta = useEffectEvent(() => getCesta());

   useEffect(() => {
      onGetCesta();
   }, [])

   if(!editableCesta) {
      return <Loading/>
   }

   return(
      editableCesta && (
         <FormCesta 
            dataCesta={editableCesta} 
            handleCestaSubmit={handleSubmitCesta}
         />
      )
   )
}