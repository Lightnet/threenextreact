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
import { nanoid16 } from "../../../lib/helper.mjs";
import CreateMaterial from "../create/CreateMaterial.js";
import CreateScript from "../scriptmodule/CreateScript.js";

export default function EntityComponentAdd(){

  const [ keySelect, setkeySelect ] = useState("");
  const [ selectComponent, setSelectComponent ] = useState("");

  const [ componentName, setComponentName ] = useState("");
  const [ entityComponents, setEntityComponents ] = useState([
      "mesh"
    , "model"
    , "material"
    , "script"
    , "userData" // threejs default name data someone
  ]);

  useEffect(()=>{
    setkeySelect(nanoid16())
  },[])

  function onSelectComp(e){
    setSelectComponent(e.target.value);
  }

  function onClose(){
    setSelectComponent("");
  }

  function renderViewComponent(){
    console.log(selectComponent);
    if(selectComponent=="material"){
      return <CreateMaterial onClose={onClose} />
    }else if(selectComponent=="script"){
      return <CreateScript />
    }
    return <></>
  }

  return <>
  <div key={keySelect} >
    <div>
      <label> Component </label>
      <select value={selectComponent} onChange={onSelectComp}>
        <option value="" > Select Component </option>
        {entityComponents.map(item=><option key={item} value={item}> {item} </option>)
        }
      </select>
      <label>Add</label>
    </div>
    <div>
      {renderViewComponent()}
    </div>
    </div>
  </>
}