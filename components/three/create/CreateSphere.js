/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreateSphere(){
  const [name, setName] = useState("sphere");
  const [dataType, setDataType] = useState("sphere")
  const [shapePhysics, setShapePhysics] = useState("sphere")
  const [mass, setMass] = useState(1)
  const [parameters, setParameters] = useState({
    radius:1
    ,widthSegments:32
    ,heightSegments:16
    ,phiStart :0
    ,phiLength :Math.PI * 2
    ,thetaStart :0
    ,thetaLength :Math.PI
  })

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parameters}
  />
}