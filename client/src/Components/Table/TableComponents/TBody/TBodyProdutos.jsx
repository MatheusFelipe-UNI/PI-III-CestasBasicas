import TCell from "../TCell/TCell";
import ButtonTable from "../../ButtonTable/ButtonTable";

export default function TBodyProdutos({
   dataInfo,
   btnInfoCollection = [],
   fieldsExcludes = [],
   customClassData = {},
}) {
   const { quantidade_estoque, estoque_minimo } = dataInfo;

   const handleSetStatusClass = (qtd_estoque, qtd_estoque_minimo) => {
      const diffQtd = Number(qtd_estoque) - Number(qtd_estoque_minimo);
      let statusClass;
      if(diffQtd > 0 && diffQtd <= 3) {
         statusClass = "yellowStyle";
      
      } else if(diffQtd <= 0) {
         statusClass = "redStyle";

      } else {
         statusClass = "greenStyle";
      }
      return statusClass;
   }

   return (
      <tr id={dataInfo.id}>
         {Object.entries(dataInfo).map(([key, value], index) => {
            if (!fieldsExcludes.includes(key)) {
               if(key === "status_estoque") {
                  return(
                     <td key={index}>
                        <p className={handleSetStatusClass(quantidade_estoque, estoque_minimo)}>
                           {value}
                        </p>
                     </td>
                  )
               }
               return (
                  <TCell
                     key={index}
                     indexValue={index}
                     keyValue={key}
                     fieldValue={value}
                     customClassData={customClassData}
                  />
               );
            }
         })}
         {btnInfoCollection.length > 0 && (
            <td>
               <div className={"tableContent__btns"}>
                  {btnInfoCollection.map((btnInfo) => (
                     <ButtonTable
                        key={btnInfo.id}
                        infoView={btnInfo.infoView}
                        classBtn={btnInfo.className}
                        toolTipsText={btnInfo.toolTipsText}
                        handleAction={btnInfo.handleAction}
                     />
                  ))}
               </div>
            </td>
         )}
      </tr>
   );
}
