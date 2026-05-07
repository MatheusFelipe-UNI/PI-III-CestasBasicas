import { useAlert } from "../../../Context/AlertContext";
import { getElementIdTable } from "../../../utils/ManipulateDataUtil";
import TableDefault from "../TableDefault/TableDefault";

import { FaEdit as IconEdit, FaTrashAlt as IconDel } from "react-icons/fa";

export function TableDefaultEditable({
   title = "",
   fieldCollection = [],
   dataCollection = [],
   fieldsExcludes = [],
   customClassData = {},
   isModalChildren = false,
   handleEdit,
   handleDelete
}) {
   const { showConfirmAlert } = useAlert();
   
   const handleConfirmDelete = async (e) => {
      const id = getElementIdTable(e);
      await showConfirmAlert({
         title: "Mover para a Lixeira",
         message:
            "Você tem certeza que deseja mover o Suprimento para a lixeira? (Esta ação poderá ser desfeita)",
         handleConfirm: async () => await handleDelete(id),
      });
   };

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

   return(
      <TableDefault
         title={title}
         dataCollection={dataCollection}
         fieldCollection={fieldCollection}
         fieldsExcludes={fieldsExcludes}
         customClassData={customClassData}
         isModalChildren={isModalChildren}
         btnCollection={btnCollection}
      />
   )

}