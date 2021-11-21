/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/36772389/how-can-i-add-multiple-classnames-to-react-component/36772461

//import { ReactPropTypes } from "react";
//import { ClassicComponentClass } from "react";
//import { ReactComponent as Times } from "./times.svg";
//import CreateContainer from "../createcontainer";
//import { createPortal } from "react-dom";

import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import cn from "classnames";
import styles from "./notification.module.css";

let timeToDelete = 300;
let timeToClose = 1000 * 10;

export default function Notification({ 
  color = Color.info,
  autoClose = false,
  onDelete, 
  children 
}) {

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (autoClose) {
      const timeoutId = setTimeout(() => setIsClosing(true), timeToClose);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [autoClose]);

  useEffect(()=>{
    if (isClosing) {
      const timeoutId = setTimeout(onDelete, timeToDelete);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isClosing, onDelete])

  return (<>
    <div className={cn([
        styles.notification,
        styles[color],
        { [styles.slideIn]: !isClosing },
        { [styles.slideOut]: isClosing },
        ])}>
      {children}
      <button onClick={() => setIsClosing(true)} className={styles.closeButton}> x </button>
    </div>
  </>);
}

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

Notification.propTypes = {
  notificationType: PropTypes.oneOf(Object.keys(Color)),
  children: PropTypes.element,
};