import { useEffect, useEffectEvent, useState } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import { useModal } from "../../../../Context/ModalContext";
import { useProduto } from "../../../../Context/ProdutosContext";
import { getProdutoByIdService } from "../../../../Services/produtos.service";
import { Loading } from "../../../Loading/Loading";
import { FormProduto } from "../../../Forms/Produtos/FormProduto";

export function ModalEditProduto() {
   const { showDataInfo, closeModal } = useModal();
   const {showSuccessAlert, showErrorAlert } = useAlert();
   const { updateProduto } = useProduto();
   const { id } = showDataInfo();
   const [editableProduto, setEditableProduto] = useState();

   const getProduto = async () => {
      try {
         const res = await getProdutoByIdService(id);
         const {
            nome_produto,
            tipo_unidade,
            quantidade_estoque,
            estoque_minimo
         } = res.data;
         setEditableProduto({
            nome_produto,
            tipo_unidade,
            quantidade_estoque,
            estoque_minimo
         });

      } catch (error) {
         console.log(error);
      }
   }

   const handleSubmitProduto = async (newProdutoData) => {
      try {
         if(await updateProduto(id, newProdutoData)) {
            showSuccessAlert({
               title: "Produto Alterado com Sucesso!"
            })
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

   const onGetProduto = useEffectEvent(() => getProduto());

   useEffect(() => {
      onGetProduto();
   }, [])

   if(!editableProduto) {
      return <Loading/>
   }

   return(
      editableProduto && (
         <FormProduto
            dataProduto={editableProduto}
            handleProdutoSubmit={handleSubmitProduto}
            handleCancel={closeModal}
         />
      )
   )
}