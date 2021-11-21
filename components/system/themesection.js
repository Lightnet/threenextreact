/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getSession } from "next-auth/react";
import React, {useState, useEffect} from "react";

export default function ThemeSection() {
  //const [data,setData] = useState

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if(theme){
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  function changeTheme(name){
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem('theme', name);
  }
  
  return (<>
    <label> Theme: </label>
    <a href="#" onClick={()=>changeTheme('light')}> Light </a>
    <span> | </span>
    <a href="#" onClick={()=>changeTheme('dark')}> Dark </a>
  </>);
}