import { FaPlus as IconAdd } from "react-icons/fa";

import styles from "./ActionBar.module.css";
import { InputSearch } from "../Input/InputSearch/InputSearch";
import { useState } from "react";

export function ActionBar({ 
   viewName = "Produto",
   searchFilter,
   onChangeSearchFilter,
   handleOpenModal,
   hasSearchBar = true,
   hasFilterButton = false,
   hasActionButton = true
}) {
   const [searchDataFilter, setSearchDataFilter] = useState(searchFilter || "");

   const updateSearchValue = (e) => {
      const value = e.target.value; 
      setSearchDataFilter(value);
      
   }

   const handleOnKeyPressSearch = (e) => {
      if(e.key === "Enter") {
         const formattedSearchFilter = String(searchDataFilter).trim();
         onChangeSearchFilter(formattedSearchFilter);
      }
   }

   return(
      <div className={styles.actionBarContainer}>
         {/* componente InputSearch */}
         {hasSearchBar && (
            <InputSearch
               type="text"
               name={"searchValue"}
               id={"searchValue"}
               placeholder={"Pesquisar..."}
               value={searchDataFilter}
               handleOnKeyPress={handleOnKeyPressSearch}
               handleOnChange={updateSearchValue}
               hasFilterButton={hasFilterButton}
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