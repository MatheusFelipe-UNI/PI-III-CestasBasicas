import { useState } from "react";
import styles from "./ViewStatusBar.module.css";
import { getScreenViewStatus, getScreenViewStatusByKey, setScreenViewStatusByKey } from "../../utils/ViewStatusUtil";

export function ViewStatusBar({ viewName = "", optionsCollection = [], viewStatusName = "", changeViewStatus }) {
   const [activeStatus, setActiveStatus] = useState(getScreenViewStatusByKey(viewStatusName) || "ATIVO");
   const [option1, option2] = optionsCollection;

   const handleStatusChange = (newStatus) => {
      if(newStatus !== activeStatus) {
         setActiveStatus(newStatus);
         changeViewStatus(newStatus);
      }
      

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