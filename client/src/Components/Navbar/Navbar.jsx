import { useState } from "react";
import Navlist from "./Navlist";
import styles from "./Navbar.module.css";

//Icones
import { HiMenu as IconMenu } from "react-icons/hi";
import { FaHome as IconHome } from "react-icons/fa";
import { FaBoxesStacked as IconBox } from "react-icons/fa6";
import { FaBox as IconCestas } from "react-icons/fa6";
import { RiFunctionAddFill as IconEntradaProdutos } from "react-icons/ri";
import { FaClipboardList as IconRequestCestas } from "react-icons/fa";
import { HiMiniUserGroup as IconClientes } from "react-icons/hi2";
import { FaBuilding as IconFornecedor } from "react-icons/fa6";
import { FaUserGear as IconUserConfig } from "react-icons/fa6";
import { MdAdminPanelSettings as IconAdmin } from "react-icons/md";
import { FaUser as IconUser } from "react-icons/fa";
import { TbLogout as IconLogout } from "react-icons/tb";

import { useUser } from "../../Context/UserContext";
import { logoutService } from "../../services/user.service";
import { useNavigate } from "react-router";

export default function Navbar() {
   const { user } = useUser();
   const navigate = useNavigate();

   const navLinkCollection = [
      {
         id: 1,
         title: "Home",
         path: "/",
         icon: <IconHome className={styles.iconList} />,
      },
      {
         id: 2,
         title: "Produtos",
         icon: <IconBox className={styles.iconList} />,
         subList: [
            {
               id: 3,
               title: "Geral",
               path: "/produtos",
               subNav: [
                  "/produtos/:id/lotes"
               ],
               icon: <IconBox className={styles.iconList} />,
            },
            {
               id: 4,
               title: "Entrada",
               path: "/produtos/entrada",
               icon: <IconEntradaProdutos className={styles.iconList} />,
            },
         ],
      },
      {
         id: 5,
         title: "Cestas",
         icon: <IconCestas className={styles.iconList} />,
         subList: [
            {
               id: 6,
               title: "Geral",
               icon: <IconCestas className={styles.iconList} />,
               path: "/cestas",
            },
            {
               id: 7,
               title: "Vendas",
               icon: <IconRequestCestas className={styles.iconList} />,
               path: "/cestas/vendas",
               subNav: [
                  "/cestas/vendas/pendentes",
                  "/cestas/vendas/concluidas",
                  "/cestas/vendas/canceladas",
               ],
            },
         ],
      },
      {
         id: 8,
         title: "Fornecedores",
         icon: <IconFornecedor className={styles.iconList} />,
         path: "/fornecedores",
      },
      {
         id: 9,
         title: "Clientes",
         icon: <IconClientes className={styles.iconList} />,
         path: "/clientes",
      },
      {
         id: 10,
         title: "Usuário",
         path: "/usuario",
         icon: <IconUserConfig className={styles.iconList} />,
      },
      {
         id: 11,
         title: "Administrador",
         icon: <IconAdmin className={styles.iconList} />,
         path: "/admin",
      },
   ];

   const [isActiveMenu, setIsActiveMenu] = useState(false);

   const handleCloseMenu = () => {
      if (isActiveMenu) {
         setIsActiveMenu(false);
      }
   };

   const handleLogout = async () => {
      try {
         await logoutService();
         navigate("/auth");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <header className={styles.navContainer}>
         <section className={styles.navContent__logo}>
            <h1>DMC</h1>
            <h2>CESTAS BÁSICAS</h2>
         </section>
         <section
            className={`${styles.navContent__info} ${isActiveMenu ? styles.navContent__info__active : ""}`}
         >
            <Navlist
               listContent={navLinkCollection}
               handleCloseMenu={handleCloseMenu}
               nivel_acesso={user?.nivel_acesso}
            />
            {user?.user && (
               <div className={styles.navContent__info__login}>
                  <div className={styles.info__login__user}>
                     <IconUser className={styles.login__user__icon} />
                     <p className={styles.login__user__name}>{user?.user}</p>
                  </div>
                  <button className={styles.info__login__btn} onClick={handleLogout}>
                     <IconLogout className={styles.login__btn__icon} />
                     Sair
                  </button>
               </div>
            )}
         </section>
         <button
            className={styles.navContent__menuBtn}
            onClick={() => setIsActiveMenu((prevValue) => !prevValue)}
         >
            <IconMenu className={styles.menuBtn__icon} />
         </button>
      </header>
   );
}
