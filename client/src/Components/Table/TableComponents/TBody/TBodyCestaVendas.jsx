import ButtonTable from "../../ButtonTable/ButtonTable";
import { IoClose as IconRemove } from "react-icons/io5";
import TCell from "../TCell/TCell";
import { useEffect } from "react";

export function TBodyCestaVendas({ 
   vendaData,
   setValue,
   errors,
   watchQtdSolicitada,
   index,
   registerQtdSolicitada,
   registerValorTotal,
   removeCesta 
}) {
   const { 
      nome_cesta, 
      valor_unitario, 
      quantidade, 
   } = vendaData;

   const errorQtdEntrada = errors?.cestas?.[index]?.quantidade_solicitada;
   const errorValorTotal = errors?.cestas?.[index]?.valor_total;
   
   const updateValorTotal = () => {
      const qtdSolicitada = watchQtdSolicitada;
      const precoUnitario = valor_unitario;
      if(qtdSolicitada && precoUnitario) {
         const valorTotal = Number(qtdSolicitada) * Number(precoUnitario);
         const valorTotalFormatted = String(valorTotal).replace(",", ".");
         setValue(`cestas.${index}.valor_total`, valorTotalFormatted);
      } else {
         setValue(`cestas.${index}.valor_total`, 0);
      }
   }

   useEffect(() => {
      updateValorTotal();
   }, [watchQtdSolicitada]);

   return (
      <tr id={vendaData.fk_id_cesta}>
         <TCell indexValue={1} fieldValue={nome_cesta} />
         <TCell indexValue={3} fieldValue={valor_unitario} />
         <TCell indexValue={4} fieldValue={quantidade} />
         <td>
            <input
               type={"number"}
               id={`qtdSolicitada${vendaData.id}`}
               onWheel={(e) => e.target.blur()}
               {...registerQtdSolicitada}
               className={errorQtdEntrada ? "inputError" : ""}
               style={{
                  maxWidth: "100px",
               }}
            />
         </td>
         <td>
            <input
               type={"text"}
               id={`valorTotal${vendaData.id}`}
               onWheel={(e) => e.target.blur()}
               disabled={true}
               {...registerValorTotal}
               className={errorValorTotal ? "inputError" : ""}
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
                  toolTipsText="Remover Cesta"
                  handleAction={() => removeCesta(index)}
               />
            </div>
         </td>
      </tr>
   );
}