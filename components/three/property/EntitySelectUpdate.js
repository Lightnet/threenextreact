/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helper.mjs";
import { useThree } from "../context/ThreeProvider";

export default function EntitySelectUpdate(){

  const [onSelectID, setOnSelectID] = useState("");
  const [selectObject, setSelectObject] = useState(null);

  const {
    sceneID
  , setSceneID
  , entities
  , dispatchEntity
} = useThree()

  const onSelectEntity = e=>setOnSelectID(e.target.value);

  useEffect(()=>{
    if(isEmpty(onSelectID)){
      return;
    }
    for(let idx in entities){
      if(entities[idx].id == onSelectID){
        console.log(entities[idx]);
        setSelectObject(entities[idx]);
        break;
      }
    }
  },[onSelectID])

  function inputPosition(event){
    console.log(event.target.type)
    console.log(event.target.name)
    console.log(event.target.value)
    let pos = selectObject.position;
    pos[event.target.name]=Number(event.target.value);//convert to number and not string.
    dispatchEntity({
        type:"update"
      , id: selectObject.id
      , keyType:"position"
      , value: pos
    })

    setSelectObject(state=>({...state, position: pos}))
  }

  function renderPosition(){
    return <>
      <input type="number" name="0" value={selectObject.position[0]} onChange={inputPosition} />
      <input type="number" name="1" value={selectObject.position[1]} onChange={inputPosition} />
      <input type="number" name="2" value={selectObject.position[2]} onChange={inputPosition} />
    </>
  }

  return <>
    <div>
      <div>
        <label> Select Entity: </label> 
        <select value={onSelectID} onChange={onSelectEntity}>
          <option value="" disabled> Select Entity  </option>
          {entities.map((item)=>{
            return <option key={item.id} value={item.id}> {item.name} :{item.id}  </option>
          })}
        </select>
      </div>
      <div>
        {onSelectID}
      </div>
      <div>
        {selectObject && renderPosition()}
      </div>
    </div>

  </>
}