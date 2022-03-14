/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { useEntity } from "../context/EntityProvider.jsx";

export default function EntityObjectScale({selectobject}){

  const [selectObject, setSelectObject] = useState(null);

  const {
      entities
    , dispatchEntity
  } = useEntity()

  useEffect(()=>{
    setSelectObject(selectobject)
  },[selectobject])

  function inputScale(event){
    let scale = selectObject.scale;
    scale[event.target.name]=Number(event.target.value); //convert to number and not string.
    dispatchEntity({
        type:"update"
      , id: selectObject.objectid
      , keyType:"scale"
      , value: scale
    })
    setSelectObject(state=>({...state, scale: scale}))
  }

  if(!selectObject?.scale){
    return <></>
  }

  return <div>
    <div><label>Scale:</label></div>
    <div><label>X:</label><input type="number" name="0" value={selectObject.scale[0]} onChange={inputScale} /></div>
    <div><label>Y:</label><input type="number" name="1" value={selectObject.scale[1]} onChange={inputScale} /></div>
    <div><label>Z:</label><input type="number" name="2" value={selectObject.scale[2]} onChange={inputScale} /></div>
  </div>
}