/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { useEntity } from "../context/ThreeProvider.js";

export default function EntityList(){

  const [entities, dispatchEntity] = useEntity()

  function renderObject3DList(){
    return entities.map((item)=>{
      return <div key={item.id}>
        <button onClick={()=>clickInfo(item)} > {item.id}  </button>
        <button onClick={()=>clickDelete(item.id)} > Delete </button>
      </div>
    })
  }

  function clickInfo(item){
    console.log(item)
  }

  function clickDelete(id){
    dispatchEntity({
      type:"remove"
      , id:id
    })
  }

  return <>
  {renderObject3DList()}
  </>
}