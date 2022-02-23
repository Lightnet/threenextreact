/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreateLight(){
  const [name, setName] = useState("pointlight");
  const [dataType, setDataType] = useState("pointlight")
  const [shapePhysics, setShapePhysics] = useState("box")
  const [mass, setMass] = useState(0)
  const [parameters, setParameters] = useState({
      color:0xff0000
    , intensity:1
  })

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parameters}
  />
}