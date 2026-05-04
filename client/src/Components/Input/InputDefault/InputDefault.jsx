import styles from "./InputDefault.module.css";

export function InputDefault({
   type = "text",
   id = "",
   placeholder = "",
   disabled = false,
   autoComplete = "off",
   customClass = "",
   textView = "",
   register = {},
   error
}) {
   return(
      <div className={`${styles.inputContainer} ${customClass} ${error ? styles.inputError : ""}`}>
         <label htmlFor={id} className={styles.inputContent__label}>{textView}</label>
         <input 
            type={type} 
            id={id}
            placeholder={placeholder}
            onWheel={(e) => e.target.blur()}
            disabled={disabled} 
            autoComplete={autoComplete}
            className={styles.inputContent__input}
            {...register}
         />
         { error && <span className="errorMessage fadeIn">{error.message}</span> }
      </div>
   )
}