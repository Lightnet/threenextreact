/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helper.mjs";
import { useEntity } from "../context/EntityProvider.js";
import EntityAddComponent from "./EntityAddComponent.js";

export default function EntitySelectUpdate(){

  const [onSelectID, setOnSelectID] = useState("");
  const [selectObject, setSelectObject] = useState(null);
  const [isRadian, setIsRadian] = useState(true);

  const [isDisplayTransform, setIsDisplayTransform] = useState(false);

  const {
    sceneID
  , setSceneID
  , entities
  , dispatchEntity
} = useEntity()

  const onSelectEntity = e=>setOnSelectID(e.target.value);

  useEffect(()=>{
    if(isEmpty(onSelectID)){
      return;
    }
    for(let idx in entities){
      if(entities[idx].objectid == onSelectID){
        console.log(entities[idx]);
        setSelectObject(entities[idx]);
        break;
      }
    }
  },[onSelectID])

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
  function inputScale(event){
    let scale = selectObject.scale;
    scale[event.target.name]=Number(event.target.value);//convert to number and not string.
    dispatchEntity({
        type:"update"
      , id: selectObject.objectid
      , keyType:"scale"
      , value: scale
    })
    setSelectObject(state=>({...state, scale: scale}))
  }

  function renderPosition(){
    return <div>
      <div><label>Position:</label></div>
      <div><label>X:</label><input type="number" name="0" value={selectObject.position[0]} onChange={inputPosition} /></div>
      <div><label>Y:</label><input type="number" name="1" value={selectObject.position[1]} onChange={inputPosition} /></div>
      <div><label>Z:</label><input type="number" name="2" value={selectObject.position[2]} onChange={inputPosition} /></div>
    </div>
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

  function renderRotation(){
    return <div>
      <div><label>Rotation:</label> <button onClick={clickIsRadian}> {isRadian ? ("Radian") : ("Degree")} </button></div>
      <div><label>X:</label><input type="number" name="0" value={convertCheckRadian(selectObject.rotation[0])} onChange={inputRotation} /></div>
      <div><label>Y:</label><input type="number" name="1" value={convertCheckRadian(selectObject.rotation[1])} onChange={inputRotation} /></div>
      <div><label>Z:</label><input type="number" name="2" value={convertCheckRadian(selectObject.rotation[2])} onChange={inputRotation} /></div>
    </div>
  }

  function renderScale(){
    return <div>
      <div><label>Scale:</label></div>
      <div><label>X:</label><input type="number" name="0" value={selectObject.scale[0]} onChange={inputScale} /></div>
      <div><label>Y:</label><input type="number" name="1" value={selectObject.scale[1]} onChange={inputScale} /></div>
      <div><label>Z:</label><input type="number" name="2" value={selectObject.scale[2]} onChange={inputScale} /></div>
    </div>
  }

  function toggleTransform(){
    setIsDisplayTransform(state=>!state);
  }

  return <>
    <div>
      <div>
        <label> Select Entity: </label> 
        <select value={onSelectID} onChange={onSelectEntity}>
          <option value="" disabled> Select Entity  </option>
          {entities.map((item)=>{
            return <option key={item.objectid} value={item.objectid}> {item.name} :{item.objectid}  </option>
          })}
        </select>
      </div>
      <div>
        {onSelectID}
      </div>
      <div>
        {selectObject && <div> <button onClick={toggleTransform}> Transform </button> </div>}
        {selectObject && isDisplayTransform && renderPosition()}
        {selectObject && isDisplayTransform && renderRotation()}
        {selectObject && isDisplayTransform && renderScale()}
      </div>
      <div>
        {selectObject &&<EntityAddComponent/>}
      </div>
    </div>

  </>
}