/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
//import { useEntity, useThree } from "../context/ThreeProvider.js";
import CreateBox from "./CreateBox.js";
import CreateCamera from "./CreateCamera.js";
import CreatePlane from "./CreatePlane.js";
import CreatePointLight from "./CreatePointLight.js";
import CreateSphere from "./CreateSphere.js";

export default function EntityCreate(){

  const [createTypes, setCreateType] = useState([
      "box"
    , "sphere"
    , "plane"
    , "pointlight"
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
    if(selectCreate=="box"){
      return <CreateBox/>
    }else if (selectCreate=="sphere"){
      return <CreateSphere/>
    }else if (selectCreate=="plane"){
      return <CreatePlane/>
    }else if (selectCreate=="camera"){
      return <CreateCamera/>
    }else if (selectCreate=="pointlight"){
      return <CreatePointLight/>
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