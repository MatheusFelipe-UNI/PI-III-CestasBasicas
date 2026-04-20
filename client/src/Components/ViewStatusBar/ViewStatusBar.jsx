import { useState } from "react";
import styles from "./ViewStatusBar.module.css";

export function ViewStatusBar() {
   const [activeStatus, setActiveStatus] = useState("ATIVO");

   const handleStatusChange = (status) => {
      setActiveStatus(status);
   };

   return(
      <div className={styles.viewStatusBarContainer}>
         <h4>Visualizar xxx</h4>
         <ul className={styles.viewStatusBarContent}>
            <li className={activeStatus === "ATIVO" ? styles.active : styles.inactive} onClick={() => handleStatusChange("ATIVO")}>ATIVO</li>
            <li className={activeStatus === "INATIVO" ? styles.active : styles.inactive} onClick={() => handleStatusChange("INATIVO")}>INATIVO</li>
         </ul>
      </div>
   )
}