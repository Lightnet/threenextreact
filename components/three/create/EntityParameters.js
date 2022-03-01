/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react

import React, { useEffect, useState } from "react";
import { useProject } from "../context/ProjectProvider.js";
import { useEntity } from "../context/EntityProvider.js";

export default function EntityParameters({name,datatype,shape,parms,mass}){
  const {projectID} = useProject();

  const {sceneID, dispatchEntity} = useEntity();
  const [_name, setName] = useState("box");
  const [dataType, setDataType] = useState("box")
  const [shapePhysics, setShapePhysics] = useState("box")
  const [_mass, setMass] = useState(1)
  const [parameters, setParameters] = useState(null)
  const [_parameters, _setParameters] = useState(null)

  const [isParameters, setIsParameters] = useState(false)
  const [selectParameters, setSelectParameters] = useState(0)

  useEffect(()=>{
    if(name){
      setName(name);
    }
    if(parms){
      //console.log(parms)
      _setParameters(parms)
      if(parms.length>=2){
        setIsParameters(true);
        setParameters(parms[0]);
      }else{
        setParameters(parms[0]);
      }
      
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
      , isPhysics: false
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
      //console.log("evt.target.checked");
      //console.log(evt.target.checked);
      setParameters(state => ({...state, [evt.target.name]: Boolean(evt.target.checked)}));
    }
    if(evt.target.type=="color"){
      //console.log(value);
      setParameters(state => ({...state, [evt.target.name]: value}));
    }
  }

  function onSelectParameters(e){
    setSelectParameters(e.target.value);
    setParameters(_parameters[e.target.value])
  }

  function checkVal(val){
    //console.log(typeof val)
    if(typeof val == "undefined"){
      return "";
    }if(typeof val == 'object'){
      return "null";
    }else{
      return val;
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
      
      if(key=="color"){ //added last as it didn't detect as color unit
        //console.log("color////////")
        type="color";
      }
      //console.log(typeof parameters[key])
      //console.log(typeof parameters[key])
      if(typeof parameters[key] == "undefined"){
        type="text";
      }
      if(typeof parameters[key] == "object"){
        type="text";
      }
      
      let item = <tr key={key}>
        <td><label> {key} </label> </td>
        <td><input name={key} type={type} value={checkVal(parameters[key])} onChange={handleChange}/></td>
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
      {isParameters &&
      <tr>
        <td>
          <label> ParamTypes: </label>
        </td>
        <td>
          <select value={selectParameters} onChange={onSelectParameters}>
            {
              _parameters.map((item,index)=>{
                return <option key={index} value={index}> Parm {index} </option>
              })
            }
          </select>
        </td>
      </tr>}
      {renderParams()}
      <tr>
        <td>
        <label> Physics: </label>
        </td>
        <td>
        
        </td>
      </tr>
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