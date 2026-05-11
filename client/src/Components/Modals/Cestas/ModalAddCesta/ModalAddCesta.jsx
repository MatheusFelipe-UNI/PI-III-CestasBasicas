import { useAlert } from "../../../../Context/AlertContext";
import { useCesta } from "../../../../Context/CestaContext";
import { useModal } from "../../../../Context/ModalContext";
import { FormCesta } from "../../../Forms/Cestas/FormCesta";

export function ModalAddCesta() {
   const {showSuccessAlert, showErrorAlert} = useAlert();
   const { closeModal } = useModal();
   const { createCesta } = useCesta();

   const handleRegisterCesta = async ({
      nome_cesta,
      quantidade,
      preco,
      cesta_itens
   }) => {
      try {
         if(!nome_cesta || !quantidade || !preco || !cesta_itens) {
            return showErrorAlert({
               title: "Erro ao Cadastrar Cesta",
               message: "Um ou mais campos vazios!",
            });
            
         }
         if(await createCesta({nome_cesta, quantidade, preco, itens_cesta: cesta_itens})) {
            showSuccessAlert({
               title: "Cesta Cadastrada com Sucesso!",
            });
            closeModal();
         }
      } catch (error) {
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Cadastrar Cesta",
               message: errMessage,
            });
         }
      }
   }


   return(
      <FormCesta handleCestaSubmit={handleRegisterCesta}/>
   )
}