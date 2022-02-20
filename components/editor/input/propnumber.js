/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://stackoverflow.com/questions/9326653/javascript-for-float-and-integer-number-validation

import React,{ useEffect, useState } from 'react';
import { isEmpty,isNumber } from "../../../lib/helper";

export default function PropNumber({ops,objid,value,objtype,objKey}) {

  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    if(value){
      setInputValue(value);
    }
    return ()=>{
      setInputValue(0);
      //value=null;
    }
  },[value]);

  //need to be add for input change value
  function inputChange(event){
    setInputValue(event.target.value);
  }

  //this will handle user press enter to update
  function inputKey(event){
    //setInputValue(event.target.value);
    if (event.keyCode === 13) {
      if(!isNumber(event.target.value)){
        console.log("NOT NUMBER!");
        return;
      }
      if(isEmpty(event.target.value)){
        console.log("Empty!");
        return;
      }
      //console.log("NUMBER: ", event.target.value);
      //updateValue(parseFloat(event.target.value));
      ops({
        action:"update"
        , id: objid
        , objtype: objtype
        , objkey: objKey
        , setValue: parseFloat(event.target.value)
      });
    }
  }

  return (<>
    <input value={inputValue} 
      onKeyUp={inputKey} 
      onChange={inputChange}      
      />
  </>);
}