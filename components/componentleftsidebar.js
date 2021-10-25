/*
  LICENSE: MIT
  Created by: Lightnet
*/


import React, {useState, useEffect} from "react";

export default function Component({SB_Width,SBClose}) {
  const [_width, _setWidth] = useState(0);

  function closeNav(event){
    event.preventDefault();
    console.log("close nav?");
    //_setWidth(0);
    SB_Width=0;
  }

  async function openNav(event) {
    event.preventDefault();
    console.log("open nav?")
    _setWidth(200);
  }

  return (<>
  
    <div id="mySidebar" className="sidebar" 
      style={{width:SB_Width+"px"}}
      >
      <a href="#" className="closebtn" onClick={()=>SBClose()}>×</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
      <a href="#">{SB_Width}</a>
      <a href="#">Contact</a>
    </div>
  </>);
}