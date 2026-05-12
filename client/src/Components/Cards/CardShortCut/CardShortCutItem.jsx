import { NavLink } from "react-router";
import { FaPlus as IconAdd } from "react-icons/fa";
import styles from "./CardShortCut.module.css";

export function CardShortCutItem({ title, path }) {
   return (
      <article className={styles.cardShortCutContainer}>
         <div className={styles.cardShortCut__icon}>
            <IconAdd />
         </div>
         <hr />
         <NavLink to={path} className={styles.cardShortCut__quickLink} end>
            {title}
         </NavLink>
      </article>
   );
}
