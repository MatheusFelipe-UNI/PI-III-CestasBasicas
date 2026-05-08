import styles from "./InputSearch.module.css";

export function InputSearch({
   type = "text",
   name,
   id,
   placeholder,
   value = "",
   handleOnChange,
   handleOnKeyPress,
   customStyle = {},
   customClass = "",
   hasFilterButton = false,
}) {
   return (
      <div className={`${styles.inputContainer} ${styles[customClass] || ""}`} style={customStyle}>
         <div className={styles.inputContent__input}>
            <input
               type={type}
               name={name}
               id={id}
               placeholder={placeholder}
               value={value}
               onKeyUp={handleOnKeyPress}
               onChange={handleOnChange}
               className={styles.input__searchField}
            />
         </div>
         {hasFilterButton && (
            <button className={styles.inputContent__filterButton} title="Filtrar">
               Filtrar e Organizar
            </button>
         )}
      </div>
   );
}
