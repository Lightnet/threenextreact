/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react

import React, { useEffect, useState } from "react";
import { useProject } from "../context/ProjectProvider.js";
import { useEntity } from "../context/EntityProvider.js";

export default function CreateShape({name,datatype,shape,parms,mass}){
  const {projectID} = useProject();

  const {sceneID, dispatchEntity} = useEntity();
  const [_name, setName] = useState("box");
  const [dataType, setDataType] = useState("box")
  const [shapePhysics, setShapePhysics] = useState("box")
  const [_mass, setMass] = useState(1)
  const [parameters, setParameters] = useState(null)
  useEffect(()=>{
    if(name){
      setName(name);
    }
    if(parms){
      setParameters(parms);
    }
    if(datatype){
      setDataType(datatype);
    }
    if(shape){
      setShapePhysics(shape);
    }
    if(typeof mass != 'undefined'){
      setMass(mass);
    }
  },[name,datatype,parms,shape])

  const typeName = e => setName(e.target.value);
  const typeMass = e => setMass(e.target.value);

  function clickCreate(){
    dispatchEntity({
        type:"add"
      , sceneid: sceneID
      , projectid: projectID
      , name: _name
      , dataType: dataType
      , parameters: parameters
      , shapePhysics: shapePhysics
      , mass: _mass
    })
  }

  function handleChange(evt) {
    const value = evt.target.value;
    //console.log(evt.target.type)
    //const name = evt.target.name;
    if(evt.target.type=="number"){
      setParameters(state => ({...state, [evt.target.name]: Number(value)}));
    }
    if(evt.target.type=="checkbox"){
      console.log("evt.target.checked");
      console.log(evt.target.checked);
      setParameters(state => ({...state, [evt.target.name]: Boolean(evt.target.checked)}));
    }
    if(evt.target.type=="color"){
      console.log(value);
      setParameters(state => ({...state, [evt.target.name]: value}));
    }
  }

  function renderParams(){
    if(!parameters){
      return <></>
    }
    //reduce is added if needed else return to current arrya
    return Object.keys(parameters).reduce(function(result, key) {
      //console.log("Type:", typeof parameters[key], key)
      let type="text";
      if(typeof parameters[key] == "number"){
        //console.log("number////////")
        type="number";
      }else if(typeof parameters[key] == "boolean"){
        //console.log("boolean////////")
        type="checkbox";
      }
      //added last as it didn't detect as color unit
      if(key=="color"){
        //console.log("color////////")
        type="color";
      }


      let item = <tr key={key}>
        <td><label> {key} </label> </td>
        <td><input name={key} type={type} value={parameters[key]} onChange={handleChange}/></td>
        </tr>

      return [ ...result,item]
    }, [])
  }

  return <>
  <table>
    <tbody>
      <tr>
        <td>
          <label> Shape: </label>
        </td>
        <td>
          <label> Box </label>
        </td>
      </tr>
      <tr>
        <td>
          <label> Name: </label>
        </td>
        <td>
          <input value={_name} onChange={typeName} />
        </td>
      </tr>
      {renderParams()}
      <tr>
        <td>
        <label> Mass: </label>
        </td>
        <td>
        <input type="number" value={_mass} onChange={typeMass} />
        </td>
      </tr>

      <tr>
        <td>
          <label> Action: </label>
        </td>
        <td>
          <button onClick={clickCreate}> Create </button>
        </td>
      </tr>
    </tbody>
  </table>
  
  

  
  
  </>
}