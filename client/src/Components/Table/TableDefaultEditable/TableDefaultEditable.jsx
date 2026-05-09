import { useAlert } from "../../../Context/AlertContext";
import { getElementIdTable } from "../../../utils/ManipulateDataUtil";
import TableDefault from "../TableDefault/TableDefault";

import { 
   FaEdit as IconEdit, 
   FaTrashAlt as IconDel,
   FaUndo as IconUndo 
} from "react-icons/fa";

export function TableDefaultEditable({
   title = "",
   fieldCollection = [],
   dataCollection = [],
   fieldsExcludes = [],
   customClassData = {},
   isModalChildren = false,
   handleEdit,
   handleStatusChange,
   currViewStatus
}) {
   const { showConfirmAlert } = useAlert();
   
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
         handleConfirm: async () => await handleStatusChange(id)
      })
   }

   const btnCollection = [
      {
         id: 1,
         infoView: <IconEdit />,
         handleAction: handleEdit,
         className: "editBtn",
         toolTipsText: "Editar"
      },
      {
         id: 2,
         infoView: <IconDel />,
         handleAction: handleConfirmDelete,
         className: "delBtn",
         toolTipsText: "Inativar",
      },
   ];

   const btnCollectionForInactive = [
      {
         id: 1,
         infoView: <IconUndo/>,
         handleAction: handleConfirmReturn,
         className: "editBtn",
         toolTipsText: "Reativar" 
      }
   ]

   return(
      <TableDefault
         title={title}
         dataCollection={dataCollection}
         fieldCollection={fieldCollection}
         fieldsExcludes={fieldsExcludes}
         customClassData={customClassData}
         isModalChildren={isModalChildren}
         btnCollection={currViewStatus === "ATIVO" ? btnCollection : btnCollectionForInactive}
      />
   )

}