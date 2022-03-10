/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { useEntity } from "../context/EntityProvider.js";

export default function EntityObjectRotation({selectobject}){

  const [selectObject, setSelectObject] = useState(null);
  const [isRadian, setIsRadian] = useState(true);

  const {
      entities
    , dispatchEntity
  } = useEntity()

  useEffect(()=>{
    setSelectObject(selectobject)
  },[selectobject])

  function inputRotation(event){
    let rotation = selectObject.rotation;
    let val = Number(event.target.value);
    if(!isRadian){
      val = val *  Math.PI / 180
    }

    rotation[event.target.name]=val;//convert to number and not string.
    dispatchEntity({
        type:"update"
      , id: selectObject.objectid
      , keyType:"rotation"
      , value: rotation
    })
    setSelectObject(state=>({...state, rotation: rotation}))
  }

  function convertCheckRadian(val){
    if(isRadian){
      return val;
    }else{
      return val * 180 / Math.PI;
    }
  }

  function clickIsRadian(){
    setIsRadian(state=>!state);
  }

  if(!selectObject?.rotation){
    return <></>
  }

  return <div>
    <div><label>Rotation:</label> <button onClick={clickIsRadian}> {isRadian ? ("Radian") : ("Degree")} </button></div>
    <div><label>X:</label><input type="number" name="0" value={convertCheckRadian(selectObject.rotation[0])} onChange={inputRotation} /></div>
    <div><label>Y:</label><input type="number" name="1" value={convertCheckRadian(selectObject.rotation[1])} onChange={inputRotation} /></div>
    <div><label>Z:</label><input type="number" name="2" value={convertCheckRadian(selectObject.rotation[2])} onChange={inputRotation} /></div>
  </div>
}