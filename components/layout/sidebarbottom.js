/*
  LICENSE: MIT
  Created by: Lightnet
*/

import styles from "./sidebarbottom.module.css";
import React, {useState, useEffect} from "react";

export default function SideBarBottom({isOpen,onRequestClose,children}) {
  const [SBWidth, setSBWidth] = useState(0);

  useEffect(() => { 
    //console.log("Top Side Bar is open?");
    if(isOpen){
      setSBWidth(32);
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
  
    <div className={styles.SideBar}
      style={{height:SBWidth}}
      >
      <a href="#" className={styles.closebtn} onClick={()=>closeSideBar()}>×</a>
      {children}
    </div>
  </>);
}