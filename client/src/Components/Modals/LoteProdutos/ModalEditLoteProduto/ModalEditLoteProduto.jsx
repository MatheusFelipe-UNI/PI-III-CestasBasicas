import { useEffect, useEffectEvent, useState } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import { useLoteProduto } from "../../../../Context/LoteProdutosContext";
import { useModal } from "../../../../Context/ModalContext";
import { getLoteProdutoByIdService } from "../../../../Services/loteProdutos.service";
import { Loading } from "../../../Loading/Loading";
import { FormLoteProdutos } from "../../../Forms/LoteProdutos/FormLoteProdutos";

export function ModalEditLoteProduto() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { updateLoteProduto } = useLoteProduto();
   const { id } = showDataInfo();
   const [editableLoteProduto, setEditableLoteProduto] = useState();

   const getLoteProduto = async () => {
      try {
         const res = await getLoteProdutoByIdService(id);
         const { 
            nome_produto,
            fk_id_fornecedor,
            valor_unitario,
            qtd_disponivel,
            data_validade
          } = res.data;

         setEditableLoteProduto({ 
            nome_produto,
            fk_id_fornecedor,
            valor_unitario,
            qtd_disponivel,
            data_validade 
         });
      } catch (error) {
         console.log(error);
      }
   }

   const handleSubmitLoteProduto = async (newLoteProdutoData) => {
      try {
         console.log(newLoteProdutoData);
         if(await updateLoteProduto(id, newLoteProdutoData)) {
            showSuccessAlert({ title: "Lote de Produto Atualizado com sucesso!" });
            closeModal();
         }
      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao editar Produto",
               message: errMessage
            })
         }
      }
   }

   const onGetLoteProduto = useEffectEvent(() => getLoteProduto());

   useEffect(() => {
      onGetLoteProduto();
   }, [])

   if(!editableLoteProduto) {
      return <Loading/>
   }

   return(
      editableLoteProduto && (
         <FormLoteProdutos
            dataLoteProduto={editableLoteProduto}
            handleLoteProdutoSubmit={handleSubmitLoteProduto}
            handleCancel={closeModal}
         />
      )
   )

}