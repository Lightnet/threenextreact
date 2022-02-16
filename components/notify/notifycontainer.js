/*
  LICENSE: MIT
  Created by: Lightnet

  information:
    For over lay message top index-z

    set to top right concer.

*/

import React, { 
  //useState 
} from "react";
import styles from "./container.module.css";

export default function NotifyContainer({children}){

  //const [portalID,setPortalID] = useState('notifyContainer');
  // id={portalID}
  return <div className={styles.container}>
    {children}
  </div>
}