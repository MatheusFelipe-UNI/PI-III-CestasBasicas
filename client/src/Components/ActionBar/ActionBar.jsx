import { FaPlus as IconAdd } from "react-icons/fa";

import styles from "./ActionBar.module.css";
import { InputSearch } from "../Input/InputSearch/InputSearch";

export function ActionBar({ 
   viewName = "Produto",
   searchFilter,
   updateFilterSearch, 
   handleOpenModal,
   hasSearchBar = true,
   hasActionButton = true
}) {
   return(
      <div className={styles.actionBarContainer}>
         {/* componente InputSearch */}
         {hasSearchBar && (
            <InputSearch
               type="text"
               name={"searchValue"}
               id={"searchValue"}
               placeholder={"Pesquisar..."}
               value={searchFilter}
               handleOnChange={updateFilterSearch}
            />
         )}
         {hasActionButton && (
            <button className={styles.actionBarContent__buttonAdd} onClick={handleOpenModal}>
               <IconAdd/> Cadastrar {viewName}
            </button>
         )}
      </div>
   )
}