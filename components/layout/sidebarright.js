/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, {useState, useEffect} from "react";
import styles from "./sidebarright.module.css";

export default function SideBarRight({isOpen,onRequestClose,children}) {
  const [SBWidth, setSBWidth] = useState(0);

  useEffect(() => { 
    //console.log("Right Side Bar is open?");
    if(isOpen){
      setSBWidth(200);
    }else{
      setSBWidth(0);
    }
    //console.log(SBWidth);
    return ()=>{
      //console.log("clean SB?");
    }
  }, [isOpen]);

  function closeSideBar(){
    if(typeof onRequestClose !== 'undefined'){
      onRequestClose();
    }
  }

  return (<>
    <div className={styles.sideBar}
      style={{width:SBWidth}}
      >
      <a href="#" className={styles.closebtn} onClick={()=>closeSideBar()}>×</a>
      {children}
    </div>
  </>);
}