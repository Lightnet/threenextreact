/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { useThree } from "../context/ThreeProvider";

export default function EntitySelectUpdate(){

  const [onSelectID, setOnSelectID] = useState("");

  const {
    sceneID
  , setSceneID
  , entities
  , dispatchEntity
} = useThree()

  const onSelectEntity = e=>setOnSelectID(e.target.value);

  return <>
    <div>
      <div>
        <label> Select Entity: </label> 
        <select value={onSelectID} onChange={onSelectEntity}>
          {entities.map((item)=>{
            return <option key={item.id} value={}>  </option>
          })}
        </select>
      </div>
    </div>

  </>
}