import TableDefault from "../../Table/TableDefault/TableDefault";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";
import { FaGear as IconConfig } from "react-icons/fa6";
import { FaTrashAlt as IconDel } from "react-icons/fa";
import { useModal } from "../../../Context/ModalContext";
import { ActionBar } from "../../ActionBar/ActionBar";

export function CestasMain() {
   const { showModal } = useModal();

   const handleOpenModal = () => {
      showModal({
         modalName: "addCesta",
         customStyle: {
            overflow: "initial"
         },
         data: {
            id: "1"
         }
      })
   }

   const fieldCollection = [
      "ID",
      "Nome Cesta",
      "Preço",
      "Ultima Alteração em"
   ];

   const fieldsExcludes = "itens_cesta";

   const tempDataCollection = [
      {
         id: 1,
         nome_cesta: "Cesta 1",
         preco: "R$ 80,00",
         itens_cesta: [
            {
               id: 1,
               nome_item: "Arroz"
            }
         ],
         updated_at: "01/01/2024"
      },
      {
         id: 2,
         nome_cesta: "Cesta 2",
         preco: "R$ 100,00",
         itens_cesta: [
            {
               id: 2,
               nome_item: "Arroz"
            }
         ],
         updated_at: "01/01/2024"
      },
   ]

   const buttonCollection = [
      {
         id: 1,
         infoView: <IconConfig/>,
         className: "subBtn",
         toolTipsText: "Visualizar Detalhes",
         handleAction: () => null
      }, 
      {
         id: 2,
         infoView: <IconDel/>,
         className: "delBtn",
         toolTipsText: "Inativar",
         handleAction: () => null
      }
   ]

   return(
      <>
         <ActionBar
            viewName="Cesta Básica"
            handleOpenModal={handleOpenModal}
         />
         <ViewStatusBar viewName="Cestas"/>
         <TableDefault
            fieldCollection={fieldCollection}
            dataCollection={tempDataCollection}
            fieldsExcludes={fieldsExcludes}
            btnCollection={buttonCollection}
         />
      </>
   )
}