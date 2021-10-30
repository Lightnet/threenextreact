/*
  LICENSE: MIT
  Created by: Lightnet
*/


import React, {useState, useEffect} from "react";

export default function Component({isOpen,onRequestClose}) {
  const [SBWidth, setSBWidth] = useState(0);

  useEffect(async () => { 
    console.log("Top Side Bar is open?");
    if(isOpen){
      setSBWidth(32);
    }else{
      setSBWidth(0);
    }
    return ()=>{
      console.log("clean Side bar?");
    }
  }, [isOpen]);

  return (<>
  
    <div id="mySidebar" className="bSideBar" 
      style={{height:SBWidth}}
      >
      <a href="#" className="closebtn" onClick={()=>onRequestClose()}>×</a>
      <a href="/about">About</a>
      <a href="/threejs">Threejs</a>
      <a href="#">About</a>
    </div>
  </>);
}