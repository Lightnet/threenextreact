/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://lo-victoria.com/a-look-at-react-hooks-usestate
// https://www.falldowngoboone.com/blog/talk-to-your-react-components-with-custom-events/

// <Modal isOpen={isOpen} onRequestClose={closeModal}>

import styles from "./sidebartop.module.css";
import React, {useState, useEffect} from "react";

export default function Component({isOpen,onRequestClose,children}) {
  const [SBHeight, setSBHeight] = useState(32);

  useEffect(async () => { 
    console.log("Top Side Bar is open?");
    if(isOpen){
      setSBHeight(32);
    }else{
      setSBHeight(0);
    }
    return ()=>{
      console.log("clean Side bar?");
    }
  }, [isOpen]);

  return (<>
    <div id="editorTopSideBar" className={styles.sidebar} style={{height:SBHeight+"px"}}>
      <a href="#" className={styles.closebtn} onClick={(e)=>onRequestClose(e)}>×</a>
      {children}
    </div>
  </>);
}
/*

*/