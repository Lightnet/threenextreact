/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreateCamera(){
  const [name, setName] = useState("camera");
  const [dataType, setDataType] = useState("camera")
  const [shapePhysics, setShapePhysics] = useState("box")
  const [mass, setMass] = useState(0)
  const [parameters, setParameters] = useState({
      fov:45
    , aspect:0.8823
    , near:1
    , far:100
  })

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parameters}
  />
}