/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { useTheme } from "./themeprovider.js";

export default function ThemeButton(){

  const {theme, setTheme} = useTheme();

  function clickTheme(event){
    event.preventDefault();
    
    let currentTheme = theme;
    let targetTheme = "light";
    //console.log('theme:', currentTheme);

    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    setTheme(targetTheme);

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
  }

  return <button onClick={clickTheme}> Theme {theme}</button>
}