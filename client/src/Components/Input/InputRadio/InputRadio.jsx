import PropTypes from 'prop-types';
import styles from './InputRadio.module.css';

export default function InputRadio({id = "", textView = "", value = "", register = {}}) {

    return(
        <div className={styles.optionContent}>
            <input type="radio" id={id} {...register} value={value}/>
            <span className={styles.customRadio}></span>
            <label htmlFor={id}>{textView}</label>
        </div>
    )
}

InputRadio.propTypes = {
    id: PropTypes.string.isRequired,
    textView: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired
}