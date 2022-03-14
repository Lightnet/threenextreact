/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { useEntity } from "../context/EntityProvider.jsx";

export default function EntityObjectPosition({selectobject}){

  const [selectObject, setSelectObject] = useState(null);

  const {
      entities
    , dispatchEntity
  } = useEntity()

  useEffect(()=>{
    setSelectObject(selectobject)
  },[selectobject])

  function inputPosition(event){
    //console.log(event.target.type)
    //console.log(event.target.name)
    //console.log(event.target.value)
    let position = selectObject.position;
    position[event.target.name]=Number(event.target.value);//convert to number and not string.
    dispatchEntity({
        type:"update"
      , id: selectObject.objectid
      , keyType:"position"
      , value: position
    })
    setSelectObject(state=>({...state, position: position}))
  }

  if(!selectObject?.position){
    return <></>
  }

  return <div>
    <div><label>Position:</label></div>
    <div><label>X:</label><input type="number" name="0" value={selectObject.position[0]} onChange={inputPosition} /></div>
    <div><label>Y:</label><input type="number" name="1" value={selectObject.position[1]} onChange={inputPosition} /></div>
    <div><label>Z:</label><input type="number" name="2" value={selectObject.position[2]} onChange={inputPosition} /></div>
  </div>
}