
export default function TCell({ indexValue, keyValue, fieldValue, customClassData = {} }) {
   return (
      <td key={indexValue} className={keyValue in customClassData ? customClassData[keyValue] : ""}>
         <p>{fieldValue}</p>
      </td>
   );
}
