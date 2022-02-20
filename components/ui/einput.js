/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/1042138/how-to-check-if-function-exists-in-javascript

import React,{ useState, useEffect } from "react";
import { isEmpty } from "../../lib/helper";

export default function EInput({isEnterKey=true, value, updateValue}) {
  const [inputValue, setInputValue] = useState("");
  const [isPress, setIsPress] = useState(false);

  useEffect(() => { 
    if(value){
      setInputValue(value);
    }
    if(isEnterKey){
      setIsPress(isEnterKey);
    }
  },[value,isEnterKey]);

  function inputChange(event){
    setInputValue(event.target.value);
  }

  //this will handle user press enter to update
  function inputKey(event){
    //setInputValue(event.target.value);
    if(isPress){
      if (event.keyCode === 13) {
        if(isEmpty(event.target.value)){
          console.log("Empty!");
          return;
        }
        //console.log("Input: ", event.target.value)
        if(typeof updateValue !== 'undefined'){
          updateValue(event.target.value);
        }
      }
    }else{
      if(typeof updateValue !== 'undefined'){
        updateValue(event.target.value);
      }
    }
  }

  return (<>
    <input value={inputValue} onKeyUp={inputKey} onChange={inputChange} />
  </>);
}