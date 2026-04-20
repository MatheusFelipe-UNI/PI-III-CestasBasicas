import TCell from "../TCell/TCell";
import ButtonTable from "../../ButtonTable/ButtonTable";

export default function TBody({
   dataInfo,
   btnInfoCollection = [],
   fieldsExcludes = [],
   customClassData = {},
}) {
   return (
      <tr id={dataInfo.id}>
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
