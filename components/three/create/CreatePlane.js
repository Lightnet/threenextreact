/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreatePlane(){
  const [name, setName] = useState("plane");
  const [dataType, setDataType] = useState("plane")
  const [shapePhysics, setShapePhysics] = useState("plane")
  const [mass, setMass] = useState(0)
  const [parmeters, setParameters] = useState({
    width:1,
    height:1,
    widthSegments :1,
    heightSegments :1,
  })

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parmeters}
  />
}