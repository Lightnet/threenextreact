/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
// https://stackoverflow.com/questions/306924/can-i-change-the-checkbox-size-using-css
import React, { useEffect, useState } from "react";

export default function CheckBox({checked,onChange}){
  //console.log(props)

  const [checkBox, setCheckBox] = useState(false);

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

  return <input className="CheckBox"  type="checkbox" checked={checkBox} onChange={emitChange} />
}