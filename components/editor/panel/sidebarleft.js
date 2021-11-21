/*
  LICENSE: MIT
  Created by: Lightnet
*/

import styles from "./sidebarleft.module.css";
import React, {useState, useEffect} from "react";

export default function SideBarLeft({isOpen,onRequestClose,children}) {
  const [SBWidth, setSBWidth] = useState(0);

  useEffect(() => { 
    //console.log("Left Side Bar is open?");
    if(isOpen){
      setSBWidth(200);
    }else{
      setSBWidth(0);
    }
    return ()=>{
      //console.log("clean Side bar?");
    }
  }, [isOpen]);

  function closeSideBar(){
    if(typeof onRequestClose !== 'undefined'){
      onRequestClose();
    }
  }

  return (<>
  
    <div className={styles.sidebar}
      style={{width:SBWidth+"px"}}
      >
      <a href="#" className={styles.closebtn} onClick={()=>closeSideBar()}>×</a>
      {children}
    </div>
  </>);
}