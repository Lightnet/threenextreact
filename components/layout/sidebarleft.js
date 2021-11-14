/*
  LICENSE: MIT
  Created by: Lightnet
*/


import React, {useState, useEffect} from "react";

export default function Component({isOpen,onRequestClose,children}) {
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

  return (<>
  
    <div id="mySidebar" className="sidebar" 
      style={{width:SBWidth+"px"}}
      >
      <a href="#" className="closebtn" onClick={()=>onRequestClose()}>×</a>
      {children}
    </div>
  </>);
}