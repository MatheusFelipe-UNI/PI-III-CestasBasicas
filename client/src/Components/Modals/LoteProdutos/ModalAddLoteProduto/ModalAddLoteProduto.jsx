import { useParams } from "react-router";
import { useAlert } from "../../../../Context/AlertContext";
import { useLoteProduto } from "../../../../Context/LoteProdutosContext";
import { useModal } from "../../../../Context/ModalContext";
import { getProdutoByIdService } from "../../../../Services/produtos.service";
import { FormLoteProdutos } from "../../../Forms/LoteProdutos/FormLoteProdutos";
import { useState } from "react";
import { useEffectEvent } from "react";
import { useEffect } from "react";
import { Loading } from "../../../Loading/Loading";

export function ModalAddLoteProduto() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { closeModal } = useModal();
   const { createLoteProduto } = useLoteProduto();
   const { id: idProduto } = useParams();
   const [produtoData, setProdutoData] = useState();

   const getProdutoById = async (id) => {
      try {
         const res = await getProdutoByIdService(id);
         const {
            nome_produto,
            tipo_unidade,
            quantidade_estoque,
            estoque_minimo
         } = res.data;
         setProdutoData({
            nome_produto,
            tipo_unidade,
            quantidade_estoque,
            estoque_minimo
         });

      } catch (error) {
         console.log(error);
      }
   }

   const handleRegisterLoteProduto = async ({
      fk_id_fornecedor, 
      valor_unitario, 
      qtd_disponivel, 
      data_validade
   }) => {
      try {
         if(!fk_id_fornecedor || 
            (valor_unitario === null || valor_unitario === undefined) || 
            (qtd_disponivel === null || qtd_disponivel === undefined) || 
            !data_validade) {
            showErrorAlert({
               title: "Erro ao Cadastrar Lote de Produto",
               message: "Um ou mais Campos vazios!"
            })
         }

         if(await createLoteProduto({
            fk_id_produto: Number(idProduto),
            fk_id_fornecedor,
            valor_unitario,
            qtd_disponivel,
            data_validade
         })) {
            showSuccessAlert({
               title: "Lote de Produto Cadastrado com Sucesso!"
            });
            closeModal();
         }
      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Cadastrar Produto",
               message: errMessage
            })
            
         }
      }
   }

   const onGetProduto = useEffectEvent((id) => getProdutoById(id));

   useEffect(() => {
      onGetProduto(idProduto);
   }, []);

   if(!produtoData) {
      return <Loading/>
   }

   return(
      produtoData && (
         <FormLoteProdutos
            nome_produto={produtoData.nome_produto}
            handleLoteProdutoSubmit={handleRegisterLoteProduto}
            handleCancel={closeModal}
         />
      )
   )
}