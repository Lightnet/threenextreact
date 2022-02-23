/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreateAmbientLight(){
  const [name, setName] = useState("ambientlight");
  const [dataType, setDataType] = useState("ambientlight")
  const [shapePhysics, setShapePhysics] = useState("box")
  const [mass, setMass] = useState(0)
  const [parameters, setParameters] = useState({
      color:0x404040
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