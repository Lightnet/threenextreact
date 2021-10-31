/*
  LICENSE: MIT
  Created by: Lightnet
*/

import styles from "./modal.module.css";
import { useRef, useState, useEffect } from 'react';

export default function Component({isOpen,closeModal}) {
  const [ sDisplay, setsDisplay ]=useState('none');

  useEffect(async () => { 
    if(isOpen==true){
      setsDisplay("block");  
    }
    if(isOpen==false){
      setsDisplay("none");  
    }
  }, [isOpen]);
  

  function closeModal(){
    console.log("close?")
    setsDisplay("none");
  }

  return (<>

  <div id="myModal" className={styles.modal} style={{display:sDisplay}}>
    <div className={styles.modalcontent}>
      <span className={styles.close} onClick={closeModal}>&times;</span>
      <p>Some text in the Modal..</p>
    </div>
  </div>

  </>);
}