/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreateScene(){
  const [name, setName] = useState("scene");
  const [dataType, setDataType] = useState("scene")
  const [shapePhysics, setShapePhysics] = useState("box")
  const [mass, setMass] = useState(1)
  const [parameters, setParameters] = useState(null)

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parameters}
  />
}