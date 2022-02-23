/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://threejs.org/docs/#api/en/core/Object3D.userData
/*
.userData : Object
An object that can be used to store custom data about the Object3D. It should not hold references to 
functions as these will not be cloned.
*/

import React, { useEffect, useState } from "react";

export default function EntityAddComponent(){

  const [ selectComponent, setSelectComponent ] = useState("");

  const [ componentName, setComponentName ] = useState("");
  const [ entityComponents, setEntityComponents ] = useState([
      "mesh"
    , "object3d"
    , "model"
    , "material"
    , "data" // threejs default name data someone
  ]);


  function onSelectComp(e){
    setSelectComponent(e.target.value);
  } 

  return <>
    <label> Add Commponent </label>
    <select value={selectComponent} onChange={onSelectComp}>
      <option value="" disabled> Select Component </option>
      {entityComponents.map(item=><option key={item} value={item}> {item} </option>)
      }
    </select>
  </>
}