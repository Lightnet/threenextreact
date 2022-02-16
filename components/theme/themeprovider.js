/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://neutralino.js.org/docs/api/storage
// https://lukelowrey.com/css-variable-theme-switcher/

import React, { createContext, useContext, useEffect, useMemo, useState} from "react";

export const themeContext = createContext();

export function useTheme(){
  const context = useContext(themeContext);
  if (!context) {
    throw new Error(`useTheme must be used within a themeContext`)
  }
  return context;
}

export function ThemeProvider(props){

  const [theme, setTheme] = useState(false);

  //check theme
  useEffect(()=>{
    var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (storedTheme){
      document.documentElement.setAttribute('data-theme', storedTheme)
    }
    //console.log("theme: ",storedTheme);
    setTheme(storedTheme);
  },[])

  const value = useMemo(()=>({
    theme, setTheme
  }),[
    theme
  ])

  return <themeContext.Provider value={value} {...props}/>
}