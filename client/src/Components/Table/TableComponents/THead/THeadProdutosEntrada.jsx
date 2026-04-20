import { ImCancelCircle as IconCancel } from "react-icons/im";

export function THeadProdutosEntrada({
   dataHeaderEntrada,
   fieldCollection = [],
   isCanceled = false,
}) {
   const maxColumn = fieldCollection.length;

   return (
      <>
         <tr className="tableHeader">
            <td colSpan={maxColumn + 1}>
               {isCanceled ? (
                  <div className="splitContainer">
                     <div className="generalInfo__container">
                        <div className="generalInfo__content">
                           <span>ID de Recebimento:</span>
                           <p>{dataHeaderEntrada?.id}</p>
                        </div>
                        <div className="generalInfo__content">
                           <span>Data de Recebimento:</span>
                           <p>{dataHeaderEntrada?.data_recebimento}</p>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="generalInfo__container">
                     <div className="splitContainer">
                        <div className="generalInfo__content">
                           <span>ID de Recebimento:</span>
                           <p>{dataHeaderEntrada?.id}</p>
                        </div>
                        <div className="generalInfo__content">
                           <span>Data de Recebimento:</span>
                           <p>{dataHeaderEntrada?.data_recebimento}</p>
                        </div>
                     </div>
                     <div className="splitContainer">
                        <button
                           className={"generalInfo__Btn"}
                           style={{ display: "flex", gap: "5px" }}
                        >
                           <IconCancel size={20} />
                           Cancelar Recebimento
                        </button>
                     </div>
                  </div>
               )}
            </td>
         </tr>
         <tr>
            {fieldCollection.map((field, index) => (
               <th key={index}>{field}</th>
            ))}
         </tr>
      </>
   );
}
