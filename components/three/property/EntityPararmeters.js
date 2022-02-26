/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react"
import { isEmpty } from "../../../lib/helper.mjs";
import { useEntity } from "../context/EntityProvider.js";

export default function EntityPararmeters({selectid}){

  const {
      sceneID
    , setSceneID
    , entities
    , dispatchEntity
  } = useEntity()

  const [selectObject, setSelectObject] = useState(null);
  const [parameters, setParameters] = useState(null)

  useEffect(()=>{
    if(isEmpty(selectid)){
      return;
    }
    for(let idx in entities){
      if(entities[idx].objectid == selectid){
        //console.log(entities[idx]);
        setSelectObject(entities[idx]);
        setParameters(entities[idx].parameters);
        console.log(entities[idx].parameters)
        break;
      }
    }
  },[selectid])

  useEffect(()=>{
    if(parameters){
      dispatchEntity({
          type:"update"
        , id: selectObject.objectid
        , keyType: "parameters"
        , value: parameters
      })
    }
  },[parameters])

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

  function renderParams(){
    if(parameters){
      return Object.keys(parameters).reduce(function(result, key) {
        //console.log("Type:", typeof parameters[key], key)
        let type="text";
        let item;
        if(typeof parameters[key] == "number"){
          //console.log("number////////")
          type="number";
        }else if(typeof parameters[key] == "boolean"){
          //console.log("boolean////////")
          type="checkbox";
          item = <tr key={key}>
          <td><label> {key} </label> </td>
          <td><input name={key} type={type} value={parameters[key]} checked={parameters[key]}  onChange={handleChange}/></td>
          </tr>
          return [ ...result,item]
        }
        //added last as it didn't detect as color unit
        if(key=="color"){
          //console.log("color////////")
          type="color";
        }
        item = <tr key={key}>
          <td><label> {key} </label> </td>
          <td><input name={key} type={type} value={parameters[key]} onChange={handleChange}/></td>
          </tr>
  
        return [ ...result,item]
      }, [])
    }
    return <></>
  } 

  return <>
    <div>
      <div>
        <label> Params: </label>
      </div>
      <div>
        <table>
          <tbody>
            {renderParams()}
          </tbody>
        </table>
      </div>
    </div>
  </>
}