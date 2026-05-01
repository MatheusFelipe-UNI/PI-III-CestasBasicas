import { useModal } from "../../../Context/ModalContext";
import { ActionBar } from "../../ActionBar/ActionBar";
import { TableDefaultEditable } from "../../Table/TableDefaultEditable/TableDefaultEditable";
import { ViewStatusBar } from "../../ViewStatusBar/ViewStatusBar";

export function ClientesMain() {
   const { showModal } = useModal();

   const handleOpenModal = () => {
      showModal({
         modalName: "addCliente",
         data: {
            id: "1"
         }
      })
   }

   const fieldCollection = [
      "ID",
      "Nome Cliente",
      "CPF/CNPJ",
      "Telefone",
      "Tipo de Cliente",
      "Ultima Alteração em"
   ];

   const tempDataCollection = [
      {
         id: 1,
         nome_cliente: "Cliente 1",
         cpf_cnpj: "000.000.000-00",
         telefone: "(00) 0000-0000",
         tipo_cliente: "Pessoa Física",
         ultima_alteracao: "01/01/2024"

      },
      {
         id: 2,
         nome_cliente: "Cliente 2",
         cpf_cnpj: "00.000.000/0001-00",
         telefone: "(00) 0000-0000",
         tipo_cliente: "Pessoa Jurídica",
         ultima_alteracao: "02/02/2024"
      }
   ]

   return (
      <>
         <ActionBar viewName="Cliente" handleOpenModal={handleOpenModal}/>
         <ViewStatusBar viewName="Clientes"/>
         <TableDefaultEditable
            fieldCollection={fieldCollection}
            dataCollection={tempDataCollection}
         />
      </>
   );
}
