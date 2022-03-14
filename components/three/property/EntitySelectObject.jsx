/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helper.mjs";
import { useEntity } from "../context/EntityProvider.jsx";
import EntityComponentAdd from "./EntityComponentAdd.jsx";
import EntityPhysicsPararmeters from "./EntityPhysicsPararmeters.jsx";
import EntityShapePararmeters from "./EntityPararmeters.jsx";
import { useEditor } from "../context/EditorProvider.jsx";
import EntityObjectMaterials from "./EntityObjectMaterials.jsx";
import EntityObjectScale from "./EntityObjectScale.jsx";
import EntityObjectPosition from "./EntityObjectPosition.jsx";
import EntityObjectRotation from "./EntityObjectRotation.jsx";

export default function EntitySelectObject(){

  const {
    selectObjectID,
    deleteObjectID,
    setSelectObjectID
  } = useEditor();

  const [onSelectID, setOnSelectID] = useState("");
  const [selectObject, setSelectObject] = useState(null);
  const [isDisplayTransform, setIsDisplayTransform] = useState(false);

  const {
    entities
  , dispatchEntity
} = useEntity()

  useEffect(()=>{
    if(isEmpty(onSelectID)){
      setSelectObject(null)
      return;
    }
    setSelectObject(entities.find(item=>item.objectid==onSelectID));
  },[onSelectID])
  
  useEffect(()=>{
    if(isEmpty(selectObjectID)){
      setSelectObject(null);
    }
    let select = entities.find(item=>item.objectid==selectObjectID)
    if(select){
      setSelectObject(select);
    }else{
      setSelectObject(null);
    }
  },[selectObjectID])

  useEffect(()=>{
    if(isEmpty(deleteObjectID)){
      return;
    }
    if(selectObject!=null){
      if(selectObject.objectid == deleteObjectID){
        setSelectObject(null)
      }
    }
  },[deleteObjectID])

  const onSelectEntity = e=>{
    setOnSelectID(e.target.value)
    setSelectObjectID(e.target.value)
  };

  function toggleVisible(e){

    dispatchEntity({
        type:"update"
      , id: selectObject.objectid
      , keyType:"visible"
      , value: e.target.checked
    })
    //setSelectObject(state=>({...state, visible: e.target.checked}))
  }

  function renderTransform(){
    if(selectObject?.position || selectObject?.rotation || selectObject?.scale){
      return <div>
        <div> <label> Transform: </label> <button onClick={()=>setIsDisplayTransform(state=>!state)}> {isDisplayTransform?("+"):("-")} </button> </div>
        {isDisplayTransform && <>
        <EntityObjectPosition selectobject={selectObject} />
        <EntityObjectRotation selectobject={selectObject} />
        <EntityObjectScale selectobject={selectObject} />
        </>}
      </div>
    }
    return <></>
  }

  return <>
    <div>
      <div>
        <label> Select Entity: </label> 
        <select value={onSelectID} onChange={onSelectEntity}>
          <option value="" > Select Entity  </option>
          {entities.map((item)=>{
            return <option key={item.objectid} value={item.objectid}>{item.name}</option>
          })}
        </select>
      </div>
      <div>
        {onSelectID}
      </div>
      {selectObject && <div>
         <input type="checkbox" checked={selectObject?.visible} onChange={toggleVisible}/> <label> Visible </label>
      </div>}
      {renderTransform()}
      <div>
        {selectObject &&<EntityShapePararmeters selectid={onSelectID}/>}
      </div>
      <div>
        {selectObject &&<EntityPhysicsPararmeters selectid={onSelectID}/>}
      </div>
      <div>
        {selectObject &&<EntityObjectMaterials selectobject={selectObject}/>}
      </div>
      <div>
        {
        selectObject &&<EntityComponentAdd selectobject={selectObject}/>
        }
      </div>
    </div>
  </>
}