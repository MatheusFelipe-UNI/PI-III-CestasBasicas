import { useState } from "react";
import styles from "./ViewStatusBar.module.css";

export function ViewStatusBar({ viewName = "", optionsCollection = [] }) {
   const [activeStatus, setActiveStatus] = useState("ATIVO");
   const [option1, option2] = optionsCollection;

   const handleStatusChange = (status) => {
      setActiveStatus(status);
   };

   return(
      <div className={styles.viewStatusBarContainer}>
         <h4>Visualizar {viewName}</h4>
         <ul className={styles.viewStatusBarContent}>
            <li className={activeStatus === "ATIVO" ? styles.active : styles.inactive} onClick={() => handleStatusChange("ATIVO")}>
               {option1 || "ATIVOS"}
            </li>
            <li className={activeStatus === "INATIVO" ? styles.active : styles.inactive} onClick={() => handleStatusChange("INATIVO")}>
               {option2 || "INATIVOS"}
            </li>
         </ul>
      </div>
   )
}