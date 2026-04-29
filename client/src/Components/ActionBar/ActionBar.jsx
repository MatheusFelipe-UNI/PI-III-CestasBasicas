import { FaPlus as IconAdd } from "react-icons/fa";

import styles from "./ActionBar.module.css";

export function ActionBar({ viewName = "Produto", handleOpenModal}) {
   return(
      <div className={styles.actionBarContainer}>
         {/* componente InputSearch */}
         <div style={{display: "flex"}}>
            <input type="text" />
            <button style={{backgroundColor: "var(--colorSec)"}}>Filtrar e organizar</button>
         </div>
         <button className={styles.actionBarContent__buttonAdd} onClick={handleOpenModal}>
             <IconAdd/> Cadastrar {viewName}
         </button>
      </div>
   )
}