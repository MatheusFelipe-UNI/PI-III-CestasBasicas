
import InputCheck from "../../../Input/InputCheck/InputCheck.jsx";
import { useState } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import { useAdmin } from "../../../../Context/AdminContext.jsx";
import { changeStatusUserService } from "../../../../services/admin.service.js";

export function TBodyAdminUser({ userData }) {
   const { showConfirmAlert, showSuccessAlert, showErrorAlert } = useAlert();
   const { getAllUsers } = useAdmin();

   // LOGICA PENDENTE
   const handleChangeUserStatus = async () => {
      try {
         const newStatus = userData.status === "ATIVO" ? "INATIVO" : "ATIVO";
         const res = await changeStatusUserService(userData.id, newStatus);
         if (res?.data?.status === "success") {
            showSuccessAlert({
               title: "Alteração Concluída",
               message: "Status de usuário alterado com sucesso!",
            });
            await getAllUsers();
         }
         
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
               title: "Erro ao Alterar Status de Usuário",
               message: errMessage,
            });
         }
      }
   };

   const handleConfirmChangeStatus = async () => {
      showConfirmAlert({
         title: "Alteração de Status",
         message:
            "Você tem certeza que deseja alterar o Status do usuário? (Esta ação poderá ser desfeita)",
         handleConfirm: handleChangeUserStatus,
      });
   };

   const NIVEL_ACESSO_DATA = {
      1: "Administrador",
      2: "Funcionário"
   }

   return (
      <tr id={userData.id}>
         <td>
            <p>{userData.usuario}</p>
         </td>
         <td>
            <p>{NIVEL_ACESSO_DATA[userData.nivel_acesso]}</p>
         </td>
         <td>
            <InputCheck
               name={`userStatus${userData.id}`}
               id={`userStatus${userData.id}`}
               checked={userData?.status === "ATIVO"}
               textView={userData?.status === "ATIVO" ? "ATIVO" : "INATIVO"}
               handleOnChange={handleConfirmChangeStatus}
            />
         </td>
         <td>
            <p>{userData.created_at}</p>
         </td>
         <td>
            <p>{userData.updated_at}</p>
         </td>
      </tr>
   );
}