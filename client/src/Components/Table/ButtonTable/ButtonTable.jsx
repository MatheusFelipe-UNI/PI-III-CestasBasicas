import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import styles from "./ButtonTable.module.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/material.css";

export default function ButtonTable({ infoView, handleAction, classBtn, toolTipsText = "" }) {
   return (
      <Tippy
         content={<div>{toolTipsText}</div>}
         theme="light-border"
         className={styles.customToolTips}
         disabled={!toolTipsText}
      >
         <button
            type="button"
            onClick={handleAction}
            className={`${styles[classBtn]} ${styles.btnTable} fadeIn`}
         >
            {infoView}
         </button>
      </Tippy>
   );
}

ButtonTable.propTypes = {
   infoView: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
   textView: PropTypes.string,
   handleAction: PropTypes.func,
   classBtn: PropTypes.string,
   toolTipsText: PropTypes.string,
};
