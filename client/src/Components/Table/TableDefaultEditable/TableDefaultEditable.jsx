import TableDefault from "../TableDefault/TableDefault";

import { FaEdit as IconEdit, FaTrashAlt as IconDel } from "react-icons/fa";

export function TableDefaultEditable({
   title = "",
   fieldCollection = [],
   dataCollection = [],
   fieldsExcludes = [],
   customClassData = {},
   isModalChildren = false
}) {
   const btnCollection = [
      {
         id: 1,
         infoView: <IconEdit />,
         handleAction: () => null,
         className: "editBtn",
         toolTipsText: "Editar"
      },
      {
         id: 2,
         infoView: <IconDel />,
         handleAction: () => null,
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