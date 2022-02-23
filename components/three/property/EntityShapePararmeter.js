/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react"
import { isEmpty } from "../../../lib/helper.mjs";

import { useEntity } from "../context/EntityProvider.js";

export default function EntityShapePararmeter({selectid}){

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
    setParameters(state => ({...state, [evt.target.name]: Number(value)}));
  }

  function renderParams(){
    if(parameters){
      return Object.keys(parameters).reduce(function(result, key) {
        let item = <tr key={key}>
          <td><label> {key} </label> </td>
          <td><input name={key} type="number" value={parameters[key]} onChange={handleChange}/></td>
          </tr>
  
        return [ ...result,item]
      }, [])
    }
    return <></>
  } 


  return <>
    <table>
      <tbody>
        {renderParams()}
      </tbody>
    </table>
  </>
}