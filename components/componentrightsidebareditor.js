/*
  LICENSE: MIT
  Created by: Lightnet
*/


import React, {useState, useEffect} from "react";

export default function Component({isOpen,onRequestClose}) {
  const [SBWidth, setSBWidth] = useState(0);

  useEffect(async () => { 
    console.log("Right Side Bar is open?");
    if(isOpen){
      setSBWidth(200);
    }else{
      setSBWidth(0);
    }
    console.log(SBWidth);
    return ()=>{
      console.log("clean SB?");
    }
  }, [isOpen]);

  return (<>
    <div id="editorRSidebar" className="rSideBar" 
      style={{width:SBWidth}}
      >
      <a href="#" className="closebtn" onClick={()=>onRequestClose()}>×</a>
      <a href="#">Scene</a>
      <a href="#">Props</a>
      <a href="#">{SBWidth}</a>
    </div>
  </>);
}