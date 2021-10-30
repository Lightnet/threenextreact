
//https://stackoverflow.com/questions/9326653/javascript-for-float-and-integer-number-validation

import { useEffect, useState } from 'react';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default function Component({selectObject,objKey,type,ops}) {

  const [posX, setPosX] = useState(0);

  useEffect(async () => {
  });

  function inputChange(event,id){
    console.log("x?");
    console.log(event.target.value);
    if(!isNumber(event.target.value)){
      console.log("BYE");
      return;
    }
    if(event.target.value != ""){
      setPosX(event.target.value);
    }
  }

  function inputKey(event){
    console.log(event.target.value);
    setPosX(event.target.value);
    if (event.keyCode === 13) {
      console.log("Enter!")
      if(event.target.value == ""){
        console.log("Empty!");
        return;
      }
      console.log(type)
      console.log(objKey)
      console.log(selectObject.id)
      /*
      if(event.target.value != ""){
        ops(event,{
          action:"update"
          , type: type
          , id: selectObject.id
          , key: key
          , setValue: parseFloat(event.target.value)
        });
      }
      */
    }
  }

  return (<>
    <input value={posX} 
      onKeyUp={inputKey} 
      onChange={inputChange}      
       />
  </>);
}
/*
 onChange={(e)=>inputX(e,selectObject.id)} 
*/