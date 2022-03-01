/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";

export default function Input({value,color,onChange}){

  const [inputColor,setInputColor] = useState('');
  const [val, setVal] = useState('');

  useEffect(()=>{
    if(typeof value != 'undefined'){
      setVal(value);
    }
  },[value])

  useEffect(()=>{
    if(color){
      //if(color=="pri"){
        //setInputColor("color");
      //}
    }
  },[color])

  const emitChange = e => {
    setVal(e.target.value)
    if(typeof onChange == 'function'){
      onChange({
        target:{
          value:e.target.value
        }
      })
    }
  };

  return <input className={inputColor} value={val} onChange={emitChange} />
}