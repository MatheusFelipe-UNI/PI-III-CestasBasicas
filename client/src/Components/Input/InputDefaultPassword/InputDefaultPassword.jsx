import styles from "./InputDefaultPassword.module.css";
import { PassEye } from "../../PassEye/PassEye";
import { useState } from "react";

export default function InputDefaultPassword({
   type = "text",
   id = "",
   placeholder = "",
   disabled = false,
   customClass = "",
   textView = "",
   register = {},
   error,
}) {
   const [isPassVisible, setIsPassVisible] = useState();

   const showHiddenPassword = () => {
      setIsPassVisible((prevValue) => !prevValue);
   };

   return (
      <div className={`${styles.inputContainer} ${customClass} ${error ? styles.inputError : ""}`}>
         <label htmlFor={id} className={styles.inputContent__label}>{textView}</label>
         <div className={styles.inputWithPassword}>
            <input
               type={isPassVisible ? "text" : "password"}
               id={id}
               placeholder={placeholder}
               onWheel={(e) => e.target.blur()}
               disabled={disabled}
               autoComplete="off"
               className={styles.inputContent__input}
               {...register}
            />
            <PassEye
               classNameRef="passEyeInput"
               isVisible={isPassVisible}
               handleOnClick={showHiddenPassword}
            />
         </div>
         {error && <span className={`errorMessage fadeIn`}>{error.message}</span>}
      </div>
   );
}
