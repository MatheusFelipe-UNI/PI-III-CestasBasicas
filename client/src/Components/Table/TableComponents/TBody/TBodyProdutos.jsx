import TCell from "../TCell/TCell";
import ButtonTable from "../../ButtonTable/ButtonTable";

export default function TBodyProdutos({
   dataInfo,
   btnInfoCollection = [],
   fieldsExcludes = [],
   customClassData = {},
}) {
   const { qtd_estoque, estoque_minimo } = dataInfo;

   return (
      <tr
         id={dataInfo.id}
         style={
            qtd_estoque <= estoque_minimo
               ? { backgroundColor: "#ffc3c3", color: "var(--colorText-for-bg-red)", fontWeight: "500" }
               : {}
         }
      >
         {Object.entries(dataInfo).map(([key, value], index) => {
            if (!fieldsExcludes.includes(key)) {
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
