/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreateCone(){
  const [name, setName] = useState("cone");
  const [dataType, setDataType] = useState("cone")
  const [shapePhysics, setShapePhysics] = useState("plane")
  const [mass, setMass] = useState(0)
  const [parameters, setParameters] = useState({
      radius :1
    , height:1
    , radialSegments:8
    , heightSegments:1
    , openEnded:false
    , thetaStart:0
    , thetaLength:2*Math.PI
  })

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parameters}
  />
}