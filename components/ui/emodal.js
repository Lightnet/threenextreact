/*
  LICENSE: MIT
  Created by: Lightnet
*/

import styles from "./modal.module.css";
import React,{ useState, useEffect } from 'react';

export default function Modal({isOpen,closeModal,children}) {
  const [ sDisplay, setsDisplay ]=useState('none');

  useEffect(() => { 
    if(isOpen==true){
      setsDisplay("block");  
    }
    if(isOpen==false){
      setsDisplay("none");  
    }
  }, [isOpen]);
  
  //function closeModal(){
    //console.log("close?")
    //setsDisplay("none");
  //}

  return (<>
  <div className={styles.modal} style={{display:sDisplay}}>
    <div className={styles.modalcontent}>
      <span className={styles.close} onClick={closeModal}>&times;</span>
      {children}
    </div>
  </div>
  </>);
}
/*

*/