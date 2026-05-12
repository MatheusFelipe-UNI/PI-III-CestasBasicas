import { NavLink, Outlet } from "react-router";
import styles from "./CestasVendasMain.module.css";

export function CestasVendasMain() {
   return(
      <div>
         <div className={styles.subnavCollection}>
            <NavLink 
               to="/cestas/vendas"
               className={({isActive}) => isActive ? styles.active : ""}
               end
            >
               Cadastro de Vendas de Cestas
            </NavLink>

            <NavLink 
               to="pendentes"
               className={({isActive}) => isActive ? styles.active : ""}
               end
            >
               Vendas Pendentes
            </NavLink>

            <NavLink 
               to="concluidas"
               className={({isActive}) => isActive ? styles.active : ""}
               end
            >
               Vendas Concluídas
            </NavLink>
         </div>
         <article className={styles.cestasVendasMainContainer} style={{border: "1px solid var(--colorPrim)"}}>
            <Outlet/>
         </article>
      </div>
   )
}