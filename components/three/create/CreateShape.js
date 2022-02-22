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
  const [parmeters, setParameters] = useState({
    width:1,
    height:1,
    depth:1,
    widthSegments :1,
    heightSegments :1,
    depthSegments :1
  })
  useEffect(()=>{
    if(name){
      setName(name);
    }
    if(datatype){
      setName(datatype);
    }
    if(parms){
      setParameters(parms);
    }
    if(datatype){
      setDataType(shape);
    }
    if(shape){
      setShapePhysics(shape);
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
      , parmeters: parmeters
      , shapePhysics: shapePhysics
      , mass: mass
    })
  }

  function handleChange(evt) {
    const value = evt.target.value;
    console.log(evt.target.type)
    //const name = evt.target.name;
    setParameters(state => ({...state, [evt.target.name]: Number(value)}));
  }

  function renderParams(){
    //reduce is added if needed else return to current arrya
    return Object.keys(parmeters).reduce(function(result, key) {
      let item = <tr key={key}>
        <td><label> {key} </label> </td>
        <td><input name={key} type="number" value={parmeters[key]} onChange={handleChange}/></td>
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