
export default function TCell({ 
   indexValue, 
   keyValue, 
   fieldValue, 
   customClassData = {},
   customClassDataForValue = {},
   customDataValue,
}) {
   return (
      <td key={indexValue} className={keyValue in customClassData ? customClassData[keyValue] : ""}>
         <p className={keyValue in customClassDataForValue ? customClassDataForValue[keyValue] : ""}>{customDataValue || fieldValue}</p>
      </td>
   );
}
