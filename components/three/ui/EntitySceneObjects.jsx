/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { log } from "../../../lib/log.mjs";
import { useEditor } from "../context/EditorProvider.jsx";
import { useEntity } from "../context/EntityProvider.jsx";

export default function EntitySceneObjects(){

  const {setDeleteObjectID} = useEditor();

  const {
    entities
    , dispatchEntity
  } = useEntity()

  function renderObject3DList(){
    return entities.map((item)=>{
      return <div key={item.objectid}>
        <button onClick={()=>clickInfo(item)} > {item.name}  </button>
        <button style={{float:"right"}} onClick={()=>clickDelete(item.objectid)} > Delete </button>
      </div>
    })
  }

  function clickInfo(item){
    log(item)
  }

  function clickDelete(id){
    dispatchEntity({
      type:"remove"
      , id:id
    })
    setDeleteObjectID(id);
  }

  return <>
    <div style={{//right bar
      width:'100%'
      //,height:'100%'
      ,height:'100%'
      //,height:'calc(100% - 56px)'
      //,background:'#778899'
      ,overflow: "scroll"
    }}>
      <div>
        <label> Entity Scene Objects: </label>
      </div>
      {renderObject3DList()}
    </div>
  </>
}