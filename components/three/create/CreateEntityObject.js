/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import API from "../context/API.mjs";
import EntityParameters from "./EntityParameters.js";

export default function CreateEntityObject(){

  const [createTypes, setCreateType] = useState([
    //"object3d"
    //, "camera"
  ])
  const [selectCreate, setSelectCreate] = useState("box");

  useEffect(()=>{
    //console.log(API.ENTITIES[0])
    //console.log(API.ENTITIES[0].parameters.length)
    for(let idx in API.ENTITIES){
      //console.log(API.ENTITIES[idx].name)
      setCreateType(state=>[...state, API.ENTITIES[idx].name])
    }
    //setCreateType();
  },[])

  function onChangeSelect(e){
    //console.log(e.target.value);
    setSelectCreate(e.target.value);
  }

  function renderSelect(){
    return createTypes.map((item)=>{
      return <option key={item} value={item}>{item}</option>
    })
  }

  function renderCreateSelect(){

    for(let idx in API.ENTITIES){
      if(API.ENTITIES[idx].name == selectCreate){
        //console.log(API.ENTITIES[idx].name)
        //setCreateType(state=>[...state, API.ENTITIES[idx].name])

        let props = {};
        props.name=API.ENTITIES[idx].name
        props.datatype=API.ENTITIES[idx].dataType
        props.parms=API.ENTITIES[idx].parameters
        props.shape=API.ENTITIES[idx].shape
        if(API.ENTITIES[idx].material){
          props.material=API.ENTITIES[idx].material
        }
        
        return <EntityParameters key={idx} {...props}/>
      }
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