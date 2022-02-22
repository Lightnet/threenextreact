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
  const [parmeters, setParameters] = useState({
    radius:1
    ,widthSegments:8
    ,heightSegments:8
    ,phiStart :0
    ,phiLength :6.2
    ,thetaStart :0
    ,thetaLength :3.1
  })

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parmeters}
  />
}