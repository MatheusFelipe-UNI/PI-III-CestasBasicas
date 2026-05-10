import { ImCancelCircle as IconCancel } from "react-icons/im";
import { useAlert } from "../../../../Context/AlertContext";
import { getEntradaProdutoByIdService, updateEntradaProdutoStatusService } from "../../../../Services/entradaProdutos.service";

export function THeadProdutosEntrada({
   dataHeaderEntrada,
   fieldCollection = [],
   isCanceled = false,
}) {
   const maxColumn = fieldCollection.length;
   const { showSuccessAlert, showConfirmAlert, showErrorAlert } = useAlert();


   const handleOnChangeEntradaStatus = async (id) => {
      try {
         const entrada = await getEntradaProdutoByIdService(id);
         const { status: currStatus } = entrada.data;
         let newStatus;

         if(currStatus === "RECEBIDA") {
            newStatus = "CANCELADA";
         } else {
            newStatus = "RECEBIDA";
         }

         if (await updateEntradaProdutoStatusService(id, newStatus)) {
            showSuccessAlert({
               title: "Entrada cancelada com sucesso!",
            });
         }

      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Cancelar Entrada",
               message: errMessage,
            });
         }        
      }
   }

   const handleConfirmDelete = async () => {
      const id = dataHeaderEntrada.id;
      await showConfirmAlert({
         title: "Cancelar Entrada de Produtos",
         message:
            "Você tem certeza que deseja CANCELAR essa Entrada de Produtos? (Esta ação NÃO poderá ser desfeita)",
         handleConfirm: async () => await handleOnChangeEntradaStatus(id),
      });
   };

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
                     {/* <div className="splitContainer">
                        <button
                           className={"generalInfo__Btn"}
                           style={{ display: "flex", gap: "5px" }}
                           onClick={handleConfirmDelete}
                        >
                           <IconCancel size={20} />
                           Cancelar Recebimento
                        </button>
                     </div> */}
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
