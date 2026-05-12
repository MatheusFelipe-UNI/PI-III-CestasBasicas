import { useState } from "react";
// Context
import { useUser } from "../../Context/UserContext";
import { useAlert } from "../../Context/AlertContext";
// Componentes
import { ValidateAuth } from "../../Components/RoutesValidate/ValidateAuth";
import styles from "./Autenticacao.module.css";

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import localforage from "localforage";
import Cookies from "js-cookie";
// Services
import { 
   getTotalUsersForFirstRegister, 
   loginService 
} from "../../services/user.service";
import { useEffectEvent } from "react";
import { useEffect } from "react";
import { PassEye } from "../../Components/PassEye/PassEye";

export function Autenticacao() {
   const [isFirstRegister, setIsFirstRegister] = useState(false);
   const [isPassLoginVisible, setIsPassLoginVisible] = useState(false);
   const { setUser } = useUser();
   const { showSuccessAlert, showErrorAlert } = useAlert();

   const navigate = useNavigate();

   const showHiddenPassLogin = () => setIsPassLoginVisible((prevValue) => !prevValue);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: { userName: "", userPass: "" } });

   const registerUserName = register("userName", {
      required: "Campo Vazio!",
   });

   const registerUserPass = register("userPass", {
      required: "Campo Vazio!",
   });

   const getTotalUsersRegistered = async () => {
      try {
         const res = await getTotalUsersForFirstRegister();
         const { total_users } = res.data;

         if (total_users > 0) {
            setIsFirstRegister(false);
         } else {
            setIsFirstRegister(true);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleLogin = async ({ userName, userPass }) => {
      try {
         const res = await loginService({ usuario: userName, senha: userPass });
         const { usuario: user, nivel_acesso } = res.data;

         Cookies.set("token", res.data.token, { expires: 1 });
         await localforage.setItem("user", { user, nivel_acesso });
         setUser({ user, nivel_acesso });

         navigate("/");
      } catch (error) {
         if (error?.response?.data) {
            const errInfo = error.response.data;
            showErrorAlert({
               title: errInfo.errMessage,
            });
         } else {
            console.log(error);
         }
      }
   };

   const handleFirstRegister = async ({ userName, userPass }) => {
      try {
         if (!userName || !userPass) {
            return showErrorAlert({
               title: "Erro ao cadastrar Usuário",
               message: "Um ou mais campos não foram preenchidos.",
            });
         }

         const res = await registerFirstUserService({ usuario: userName, senha: userPass });

         if (res.status === 201) {
            showSuccessAlert({
               title: "Cadastro Concluído",
               message:
                  "Usuário Administrador cadastrado com sucesso! Efetue o login para continuar.",
            });
         }
         setIsFirstRegister(false);
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const errInfo = error.response.data;
            showErrorAlert({
               title: "Erro ao cadastrar Usuário",
               message: errInfo.errMessage || errInfo.message,
            });
         }
      }
   };

   const onGetTotalUsersRegistered = useEffectEvent(() => getTotalUsersRegistered());

   useEffect(() => {
      onGetTotalUsersRegistered();
   }, []);

   return (
      <ValidateAuth>
         <div className={styles.authContainer}>
            <form
               action="" 
               className={styles.formAuthContainer}
               onSubmit={handleSubmit(isFirstRegister ? handleFirstRegister : handleLogin)}
            >
               <h1>{isFirstRegister ? "CADASTRO" : "LOGIN"}</h1>
               {
                  isFirstRegister && (
                     <p className={styles.exceptionMessageAuth}>
                        <span>ATENÇÃO: </span>
                        Este é o primeiro cadastro de usuário no sistema. Portanto, ele será
                        cadastrado como <strong>Administrador</strong>. Preencha os campos abaixo
                        para criar a conta de acesso.
                     </p>
                  )
               }
               <div className={`${styles.inputContainer} ${errors?.userName ? styles.inputError : ""}`}>
                  <label htmlFor="usuario">USUÁRIO*</label>
                  <input type="text" id="usuario" {...registerUserName} />
                  {errors?.userName && (
                     <span className={styles.customErrorMessage}>{errors?.userName?.message}</span>
                  )}
               </div>
               <div className={styles.authSpecialInput}>
                  <div className={`${styles.inputContainer} ${errors?.userPass ? styles.inputError : ""}`}>
                     <label htmlFor="senha">SENHA*</label>
                     <input type={isPassLoginVisible ? "text" : "password"} id="senha" {...registerUserPass} />
                     {errors?.userPass && (
                        <span className={styles.customErrorMessage}>{errors?.userPass?.message}</span>
                     )}
                  </div>
                  <PassEye
                     isVisible={isPassLoginVisible}
                     classNameRef="passEyeForm"
                     handleOnClick={showHiddenPassLogin}
                  />
               </div>
               <button className={styles.buttonLogin}>
                  {isFirstRegister ? "CADASTRAR" : "ENTRAR"}
               </button>
            </form>
         </div>
      </ValidateAuth>
   );
}
