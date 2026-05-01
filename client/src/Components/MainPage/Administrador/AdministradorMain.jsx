import { useModal } from "../../../Context/ModalContext";
import { ActionBar } from "../../ActionBar/ActionBar";
import { TableAdminUser } from "../../Table/TableAdminUser/TableAdminUser";

export function AdministradorMain() {
   const { showModal } = useModal();

   const handleOpenModal = () => {
      showModal({
         modalName: "addAdmin",
         data: {
            id: "1"
         }
      })
   }

   const tempDataUser = [
      {
         id: 1,
         usuario: "claudio.pereira",
         status: "ATIVO"
      },
      {
         id: 2,
         usuario: "jorge.henrique",
         status: "INATIVO"
      }
   ]

   return(
      <>
         <ActionBar viewName="Administrador" handleOpenModal={handleOpenModal}/>
         <TableAdminUser userCollection={tempDataUser}/>
      </>
   )
}