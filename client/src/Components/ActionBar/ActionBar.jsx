import { FaPlus as IconAdd } from "react-icons/fa";

import styles from "./ActionBar.module.css";
import { InputSearch } from "../Input/InputSearch/InputSearch";

export function ActionBar({ 
   viewName = "Produto",
   searchFilter,
   updateFilterSearch, 
   handleOpenModal
}) {
   return(
      <div className={styles.actionBarContainer}>
         {/* componente InputSearch */}
         <InputSearch
            type="text"
            name={"searchValue"}
            id={"searchValue"}
            placeholder={"Pesquisar..."}
            value={searchFilter}
            handleOnChange={updateFilterSearch}
         />
         <button className={styles.actionBarContent__buttonAdd} onClick={handleOpenModal}>
             <IconAdd/> Cadastrar {viewName}
         </button>
      </div>
   )
}