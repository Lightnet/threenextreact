/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { getEntities } from "../context/EntityComponets.jsx";
//import API from "../context/API.mjs";
import EntityParameters from "./EntityParameters.jsx";

const ENTITIES = getEntities();

export default function CreateEntityObject(){

  const [createTypes, setCreateType] = useState([
    //"object3d"
    //, "camera"
  ])
  const [selectCreate, setSelectCreate] = useState("box");

  useEffect(()=>{
    //console.log(ENTITIES[0])
    //console.log(ENTITIES[0].parameters.length)
    for(let idx in ENTITIES){
      //console.log(ENTITIES[idx].name)
      setCreateType(state=>[...state, ENTITIES[idx].name])
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

    for(let idx in ENTITIES){
      if(ENTITIES[idx].name == selectCreate){
        //console.log(ENTITIES[idx].name)
        //setCreateType(state=>[...state, ENTITIES[idx].name])

        let props = {};
        props.name=ENTITIES[idx].name
        props.istransform=ENTITIES[idx].isTransform
        props.datatype=ENTITIES[idx].dataType
        props.parms=ENTITIES[idx].parameters
        props.shape=ENTITIES[idx].shape || null
        if(ENTITIES[idx].material){
          props.material=ENTITIES[idx].material
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