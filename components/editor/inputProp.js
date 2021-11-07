/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://stackoverflow.com/questions/9326653/javascript-for-float-and-integer-number-validation

import { useEffect, useState } from 'react';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default function Component({selectObject,objKey,type,ops}) {

  const [posX, setPosX] = useState(0);

  useEffect(async () => {
    //select object change to update value
    if(objKey=="positionX"){
      setPosX(selectObject.position[0])
    }
    if(objKey=="positionY"){
      setPosX(selectObject.position[1])
    }
    if(objKey=="positionZ"){
      setPosX(selectObject.position[2])
    }

    if(objKey=="rotationX"){
      setPosX(selectObject.rotation[0])
    }
    if(objKey=="rotationY"){
      setPosX(selectObject.rotation[1])
    }
    if(objKey=="rotationZ"){
      setPosX(selectObject.rotation[2])
    }

    if(objKey=="scaleX"){
      setPosX(selectObject.scale[0])
    }
    if(objKey=="scaleY"){
      setPosX(selectObject.scale[1])
    }
    if(objKey=="scaleZ"){
      setPosX(selectObject.scale[2])
    }
  },[selectObject]);

  //need to be add for input change value
  function inputChange(event){
    //console.log("x?");
    //console.log(event.target.value);
    if(!isNumber(event.target.value)){
      //console.log("BYE");
      setPosX(0);
      return;
    }
    //if(event.target.value != ""){
      setPosX(event.target.value);
    //}
  }

  //this will handle user press enter to update
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
      
      if(event.target.value != ""){
        ops(event,{
          action:"update"
          , type: type
          , id: selectObject.id
          , key: objKey
          , setValue: parseFloat(event.target.value)
        });
      }
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