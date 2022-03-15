/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { getEntities } from "../context/EntityComponets.jsx";
import EntityParameters from "./EntityParameters.jsx";
//predefine entities set up.
const ENTITIES = getEntities();

export default function CreateEntityObject(){

  const [createTypes, setCreateType] = useState([])
  const [selectCreate, setSelectCreate] = useState("box");

  useEffect(()=>{
    //console.log(ENTITIES[0])
    // create the list name
    for(let idx in ENTITIES){
      //console.log(ENTITIES[idx].name)
      setCreateType(state=>[...state, ENTITIES[idx].name])
    }
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
        //set up props key and value
        let props = {};
        props.name=ENTITIES[idx].name
        props.istransform=ENTITIES[idx].isTransform
        props.datatype=ENTITIES[idx].dataType
        props.parms=ENTITIES[idx].parameters
        props.shape=ENTITIES[idx].shape || null
        props.mass=ENTITIES[idx].mass || null
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