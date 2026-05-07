import { useAdmin } from "../../../Context/AdminContext";
import { useModal } from "../../../Context/ModalContext";
import { ActionBar } from "../../ActionBar/ActionBar";
import { Loading } from "../../Loading/Loading";
import { TableAdminUser } from "../../Table/TableAdminUser/TableAdminUser";

export function AdministradorMain() {
   const { showModal } = useModal();
   const {
      allUsers: users,
      isLoading,
      getAllUsers
   } = useAdmin();

   const handleOpenModal = () => {
      showModal({
         modalName: "addAdmin",
         data: {
            getAllUsers
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
         <ActionBar 
            viewName="Novo Usuário"
            handleOpenModal={handleOpenModal} 
            hasSearchBar={false}/>
         <h2 className="subTitle">Todos os Usuários</h2>
         { isLoading ? <Loading/> : users && <TableAdminUser userCollection={users}/> }
      </>
   )
}