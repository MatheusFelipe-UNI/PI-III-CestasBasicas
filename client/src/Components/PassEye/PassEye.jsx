import { FaEye as IconEyeVisible, 
         FaEyeSlash as IconEyeNotVisible} from "react-icons/fa";
import styles from "./PassEye.module.css";

export function PassEye({classNameRef = "", isVisible = false, handleOnClick}) {
    return(
        <div className={styles[classNameRef]} onClick={handleOnClick}>
            {isVisible ? <IconEyeNotVisible/> : <IconEyeVisible/>}
        </div>
    )
}