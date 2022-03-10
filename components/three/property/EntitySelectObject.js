/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helper.mjs";
import { useEntity } from "../context/EntityProvider.js";
import EntityComponentAdd from "./EntityComponentAdd.js";
import EntityPhysicsPararmeters from "./EntityPhysicsPararmeters.js";
import EntityShapePararmeters from "./EntityPararmeters.js";
import { useEditor } from "../context/EditorProvider.js";
import EntityMaterials from "./EntityMaterials.js";
import EntityObjectScale from "./EntityObjectScale.js";
import EntityObjectPosition from "./EntityObjectPosition.js";
import EntityObjectRotation from "./EntityObjectRotation.js";

export default function EntitySelectObject(){

  const {
    selectObjectID,
    deleteObjectID,
    setSelectObjectID
  } = useEditor();

  const [onSelectID, setOnSelectID] = useState("");
  const [selectObject, setSelectObject] = useState(null);
  const [isDisplayTransform, setIsDisplayTransform] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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

  function toggleTransform(){
    setIsDisplayTransform(state=>!state);
  }

  function toggleVisible(e){
    setIsVisible(e.target.checked)

    dispatchEntity({
        type:"update"
      , id: selectObject.objectid
      , keyType:"visible"
      , value: e.target.checked
    })

    //setSelectObject(state=>({...state, visible: e.target.checked}))
  }

  return <>
    <div>
      <div>
        <label> Select Entity: </label> 
        <select value={onSelectID} onChange={onSelectEntity}>
          <option value="" > Select Entity  </option>
          {entities.map((item)=>{
            return <option key={item.objectid} value={item.objectid}> {item.name} :{item.objectid}  </option>
          })}
        </select>
      </div>
      <div>
        {onSelectID}
      </div>
      {selectObject && <div>
         <input type="checkbox" checked={selectObject?.visible} onChange={toggleVisible}/> <label> Visible </label>
      </div>}
      <div>
        {selectObject && <div> <button onClick={toggleTransform}> Transform </button> </div>}
        {selectObject && isDisplayTransform && <EntityObjectPosition selectobject={selectObject} />}
        {selectObject && isDisplayTransform && <EntityObjectRotation selectobject={selectObject} />}
        {selectObject && isDisplayTransform && <EntityObjectScale selectobject={selectObject} />}
      </div>
      <div>
        {
        selectObject &&<EntityShapePararmeters selectid={onSelectID}/>
        }
      </div>

      <div>
        {
        selectObject &&<EntityPhysicsPararmeters selectid={onSelectID}/>
        }
      </div>

      <div>
        {
        selectObject &&<EntityMaterials selectobject={selectObject}/>
        }
      </div>

      <div>
        {
        selectObject &&<EntityComponentAdd selectobject={selectObject}/>
        }
      </div>
    </div>
  </>
}