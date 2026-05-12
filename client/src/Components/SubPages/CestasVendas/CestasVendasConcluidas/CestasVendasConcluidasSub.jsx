import { useVendaCesta } from "../../../../Context/VendaCestaContext";
import { ActionBar } from "../../../ActionBar/ActionBar";
import { Loading } from "../../../Loading/Loading";
import TableDefault from "../../../Table/TableDefault/TableDefault";
import { ImCancelCircle as IconCancel } from "react-icons/im";

export function CestasVendasConcluidasSub() {
   const {
      filteredVendaCestas: vendas,
      isLoading,
      defineSearchParams,
      searchValueMemo: searchValue,
   } = useVendaCesta();
   const fieldCollection = [
      "ID",
      "Cliente",
      "Cesta Solicitada",
      "Qtd. Solicitada",
      "Valor Total",
      "Cadastrado por",
      "Data Retirada",
   ];

   return (
      <>
         <ActionBar
            viewName="Vendas Concluídas"
            hasActionButton={false}
            searchFilter={searchValue}
            onChangeSearchFilter={defineSearchParams}
         />
         {isLoading ? (
            <Loading/>
         ) : (
            <TableDefault
               fieldCollection={fieldCollection}
               dataCollection={vendas}
            />
         )}
      </>
   );
}
