/*
  LICENSE: MIT
  Created by: Lightnet
*/


import React, {useState, useEffect} from "react";

export default function Component({SB_Height,SBClose}) {
  const [_width, _setWidth] = useState(0);

  function closeNav(event){
    event.preventDefault();
    console.log("close nav?");
    //_setWidth(0);
    LSB_Width=0;
  }

  async function openNav(event) {
    event.preventDefault();
    console.log("open nav?")
    _setWidth(200);
  }

  return (<>
  
    <div id="mySidebar" className="bSideBar" 
      style={{height:SB_Height+"px"}}
      >
      <a href="#" className="closebtn" onClick={()=>SBClose()}>×</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
      <a href="#">{SB_Height}</a>
      <a href="#">Contact</a>
    </div>
  </>);
}