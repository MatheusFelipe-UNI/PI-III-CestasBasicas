import { useAlert } from "../../../Context/AlertContext";
import { getElementIdTable } from "../../../utils/ManipulateDataUtil";
import TBodyProdutos from "../TableComponents/TBody/TBodyProdutos";
import THeadGeneral from "../TableComponents/THead/THeadGeneral";
import TableDefault from "../TableDefault/TableDefault";
import { 
   FaEdit as IconEdit, 
   FaTrashAlt as IconDel,
   FaUndo as IconUndo 
} from "react-icons/fa";

export function TableProdutos({
   title = "",
   dataCollection = [],
   handleViewLotes,
   handleEdit,
   handleStatusChange,
   currViewStatus,
   isModalChildren = false,
}) {
   const { showConfirmAlert } = useAlert();

   const fieldCollection = [
      "ID",
      "Nome Produto",
      "Tipo Unidade",
      "Qtd. Estoque",
      "Qtd. Estoque Mínimo",
      "Status Estoque",
      "Última Atualização",
   ];

   const fieldsExcludes = ["created_at"];

   const handleConfirmDelete = async (e) => {
      const id = getElementIdTable(e);
      await showConfirmAlert({
         title: "Desativar Registro",
         message:
            "Você tem certeza que deseja DESATIVAR o Registro? (Esta ação poderá ser desfeita)",
         handleConfirm: async () => await handleStatusChange(id),
      });
   };

   const handleConfirmReturn = async (e) => {
      const id = getElementIdTable(e);
      await showConfirmAlert({
         title: "Reativar Registro",
         message: "Você tem certeza que deseja REATIVAR o Registro?",
         handleConfirm: async () => await handleStatusChange(id),
      });
   };

   const btnCollection = [
      {
         id: 1,
         infoView: "Visualizar Lote",
         handleAction: handleViewLotes,
         className: "primBtnDark",
      },
      {
         id: 2,
         infoView: <IconEdit />,
         handleAction: handleEdit,
         className: "editBtn",
         toolTipsText: "Editar",
      },
      {
         id: 3,
         infoView: <IconDel />,
         handleAction: handleConfirmDelete,
         className: "delBtn",
         toolTipsText: "Inativar Produto",
      },
   ];

   const btnCollectionForInactive = [
      {
         id: 1,
         infoView: <IconUndo />,
         handleAction: handleConfirmReturn,
         className: "editBtn",
         toolTipsText: "Reativar",
      },
   ];

   return (
      <>
         {dataCollection.length > 0 ? (
            <div className={`tableContainer ${!isModalChildren ? "fadeIn" : ""}`}>
               <table>
                  <thead>
                     <THeadGeneral
                        title={title}
                        fieldCollection={fieldCollection}
                        hasActionBtn={btnCollection.length > 0}
                     />
                  </thead>
                  <tbody>
                     {dataCollection.map((data) => (
                        <TBodyProdutos
                           key={data.id}
                           dataInfo={data}
                           btnInfoCollection={currViewStatus === "ATIVO" ? btnCollection : btnCollectionForInactive}
                           fieldsExcludes={fieldsExcludes}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <p className="textInfoNotAvaliable textMargin">Nenhum Registro Encontrado</p>
         )}
      </>
   );
}
