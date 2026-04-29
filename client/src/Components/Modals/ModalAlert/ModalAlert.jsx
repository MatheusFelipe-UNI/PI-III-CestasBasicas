import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useAlert } from "../../../Context/AlertContext";

//Icones
import { FaCheck as IconCheck} from "react-icons/fa";
import { IoAlert as IconAlert} from "react-icons/io5";
import { FaXmark as IconImportant} from "react-icons/fa6";

import styles from "./ModalAlert.module.css";

export function ModalAlert() {
    const {alertRef, closeAlert} = useAlert();

    const [alert, setAlert] = useState({});
    const elementRef = useRef(null);

    const alertOptions = [
        {id: 1, type: "success", icon: <IconCheck/>, modalClass: "modalSuccess"},
        {id: 2, type: "alert", icon: <IconAlert/>, modalClass: "modalAlert"},
        {id: 3, type: "error", icon: <IconImportant/>, modalClass: "modalImportant"}
    ]

    const handleClickCloseAlert = () => {
        closeAlert();
        setAlert({});
    }


    const executeAnimation = () => {
        const element = elementRef.current;
        if(element.classList.contains("fadeIn")) {
            setTimeout(() => {
                element.classList.remove("fadeIn");
            }, 300);
        }
    }

    

    useEffect(() => {
        const modalSelected = alertOptions.find(alertInfo => alertInfo.type === alertRef.alertType)
        setAlert(modalSelected);
        executeAnimation();

    }, [alertRef])

    return (
        <div className={styles.modalMessage__cover}>
            <div className={`${styles.modalMessageContainer} ${styles[alert.modalClass]} fadeIn`} ref={elementRef}>
                <div className={styles.modalMessageContent__header}>
                    {alert.icon}
                </div>
                <div className={styles.modalMessageContent__info}>
                    <h1 className={styles.info__title}>{alertRef.title}</h1>
                    <p className={styles.info__text}>{alertRef.message}</p>
                    <hr />
                    <div className={styles.info__btnCollection}>
                        {alertRef.btnCollection.map(btnInfo => (
                            <button key={btnInfo.id}
                                    className={btnInfo.type === "cancel" 
                                                ? styles.btnCollection__btnCancel 
                                                : styles.btnCollection__btnConfirm}
                                    onClick={btnInfo.handleAction ? btnInfo.handleAction : handleClickCloseAlert}>
                                {btnInfo.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalAlert.propTypes = {
    modalTypeSelect: PropTypes.string,
    modalTitle: PropTypes.string,
    modalText: PropTypes.string,
    modalAction: PropTypes.func
}