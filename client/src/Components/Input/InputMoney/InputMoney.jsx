import CurrencyInput from "react-currency-input-field";
import styles from "./InputMoney.module.css";
import { Controller } from "react-hook-form";

export function InputMoney({
   controlName = "",
   control, 
   id = "", 
   placeholder = "",
   error, 
   textView = "",
}) {
   return(
      <div className={`${styles.inputMoneyContainer} ${error ? styles.inputError : ""}`}>
         <label htmlFor={id} className={styles.inputMoneyContent__label}>{textView}</label>
         <Controller
            control={control}
            name={controlName}
            rules={{
               required: "Campo Obrigatório!",
               min: {
                  value: 0,
                  message: "Insira um valor maior ou igual a 0",
               }
            }}
            render={({ field }) => (
               <CurrencyInput
                  id={id}
                  name={field.name}
                  value={field.value}
                  placeholder={placeholder}
                  className={styles.inputMoneyContent__input}
                  onValueChange={(value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  prefix="R$ "
                  decimalsLimit={2}
                  decimalScale={2}
                  decimalSeparator="."
                  groupSeparator=";"
                  disableGroupSeparators={true}
                  
               /> 
            )}
         />
         { error && <span className="errorMessage fadeIn">{error.message}</span> }
      </div>
   )
}