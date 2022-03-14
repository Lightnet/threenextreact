/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Display message and timer to auto close

*/

// https://stackoverflow.com/questions/36772389/how-can-i-add-multiple-classnames-to-react-component/36772461

import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./notification.module.css";
import { Color } from "./NotifyProvider.jsx";

let timeToDelete = 300;
let timeToClose = 1000 * 10;

export default function Notification({ 
  color = Color.info,
  autoClose = false,
  onDelete, 
  children 
}) {
  //console.log(color,autoClose,children)
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