/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.w3schools.com/howto/howto_css_switch.asp

import React, { useEffect, useState } from "react";
import Styles from "./switch.module.css";

export default function Switch({checked,onChange,round}){

  const [checkBox, setCheckBox] = useState(false);
  const [shape, setShape] = useState("");

  useEffect(()=>{
    console.log(round)
    console.log(Styles.slider)
    if(typeof round != "undefined"){
      if(round){
        setShape(Styles.slider + " " + Styles.round);
      }
    }else{
      setShape(Styles.slider);
    }
  },[round])

  useEffect(()=>{
    console.log(checked)
    if(typeof checked != "undefined"){
      setCheckBox(checked);
    }
  },[checked])

  const emitChange = e => {
    console.log(e.target.checked)
    setCheckBox(e.target.checked);
    if(typeof onChange == 'function'){
      onChange({
        target:{
          checked:e.target.checked
        }
      })
    }
  };

  return(<label className={Styles.switch}>
    <input type="checkbox" checked={checkBox} onChange={emitChange}/>
    <span className={shape}></span>
  </label>)
}