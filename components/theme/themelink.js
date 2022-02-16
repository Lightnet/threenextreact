/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { useTheme } from "./themeprovider.js";

export default function ThemeLink(){

  const {theme, setTheme} = useTheme();

  function clickTheme(event){
    event.preventDefault();
    //console.log('theme');
    let currentTheme = theme;
    let targetTheme = "light";

    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    setTheme(targetTheme);

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
  }

  function capitalizeFirstLetter(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  return <a style={{cursor: 'pointer'}} onClick={clickTheme}>Theme {capitalizeFirstLetter(theme)}</a>
}