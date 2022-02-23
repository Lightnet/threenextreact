/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreateBox(){
  const [name, setName] = useState("box");
  const [dataType, setDataType] = useState("box")
  const [shapePhysics, setShapePhysics] = useState("box")
  const [mass, setMass] = useState(1)
  const [parameters, setParameters] = useState({
    width:1,
    height:1,
    depth:1,
    widthSegments :1,
    heightSegments :1,
    depthSegments :1
  })

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parameters}
  />
}