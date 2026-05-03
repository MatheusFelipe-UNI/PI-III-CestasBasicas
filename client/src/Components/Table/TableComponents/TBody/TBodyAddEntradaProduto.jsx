import TCell from "../TCell/TCell";
import { IoClose as IconRemove } from "react-icons/io5";
import ButtonTable from "../../ButtonTable/ButtonTable";

export function TBodyAddEntradaProduto({ produtoData, registerQtdEntrada, errors, index, removeProduto }) {
   const { 
      nome_produto, 
      fornecedor,
      tipo_unidade, 
      quantidade_estoque, 
   } = produtoData;

   const errorQtdEntrada = errors?.produtos?.[index]?.quantidade_adquirida;

   return (
      <tr id={produtoData.id}>
         <TCell indexValue={1} fieldValue={nome_produto} />
         <TCell indexValue={2} fieldValue={fornecedor} />
         <TCell indexValue={3} fieldValue={tipo_unidade} />
         <TCell indexValue={4} fieldValue={quantidade_estoque} />
         <td>
            <input
               type={"number"}
               id={`qtdEntrada${produtoData.id}`}
               onWheel={(e) => e.target.blur()}
               {...registerQtdEntrada}
               className={errorQtdEntrada ? "inputError" : ""}
               style={{
                  maxWidth: "100px",
               }}
            />
         </td>
         <td>
            <div className={"tableContent__btns"}>
               <ButtonTable
                  infoView={<IconRemove />}
                  classBtn={"delBtn"}
                  toolTipsText="Remover Produto"
                  handleAction={() => removeProduto(index)}
               />
            </div>
         </td>
      </tr>
   );
}