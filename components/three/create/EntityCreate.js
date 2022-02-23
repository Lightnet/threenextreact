/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import CreateAmbientLight from "./CreateAmbientLight.js";
import CreateBox from "./CreateBox.js";
import CreateCamera from "./CreateCamera.js";
import CreateCone from "./CreateCone.js";
import CreateGroup from "./CreateGroup.js";
import CreateLight from "./CreateLight.js";
import CreateObject3D from "./CreateObject3D.js";
import CreatePlane from "./CreatePlane.js";
import CreatePointLight from "./CreatePointLight.js";
import CreateScene from "./CreateScene.js";
import CreateSphere from "./CreateSphere.js";

export default function EntityCreate(){

  const [createTypes, setCreateType] = useState([
      "object3d"
    , "group"
    , "scene"
    , "box"
    , "sphere"
    , "plane"
    , "cone"
    , "light"
    , "pointlight"
    , "ambientlight"
    , "camera"
  ])
  const [selectCreate, setSelectCreate] = useState("box");

  function onChangeSelect(e){
    console.log(e.target.value);
    setSelectCreate(e.target.value);
  }

  function renderSelect(){
    return createTypes.map((item)=>{
      return <option key={item} value={item}>{item}</option>
    })
  }

  function renderCreateSelect(){
    if(selectCreate=="object3d"){
      return <CreateObject3D/>
    }else if(selectCreate=="group"){
      return <CreateGroup/>
    }else if(selectCreate=="scene"){
      return <CreateScene/>
    }else if(selectCreate=="box"){
      return <CreateBox/>
    }else if (selectCreate=="sphere"){
      return <CreateSphere/>
    }else if (selectCreate=="plane"){
      return <CreatePlane/>
    }else if (selectCreate=="camera"){
      return <CreateCamera/>
    }else if (selectCreate=="pointlight"){
      return <CreatePointLight/>
    }else if (selectCreate=="ambientlight"){
      return <CreateAmbientLight/>
    }else if (selectCreate=="light"){
      return <CreateLight/>
    }else if (selectCreate=="cone"){
      return <CreateCone/>
    }
    return <></>
  }

  return <>
  <label> Create Type: </label>
  <select value={selectCreate} onChange={onChangeSelect}>
    {renderSelect()}
  </select><br/>
  {renderCreateSelect()}

  </>
}