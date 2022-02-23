/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react

import React, { useState } from "react";
import CreateShape from "./CreateShape.js";

export default function CreateGroup(){
  const [name, setName] = useState("group");
  const [dataType, setDataType] = useState("group")
  const [shapePhysics, setShapePhysics] = useState("box")
  const [mass, setMass] = useState(1)
  const [parmeters, setParameters] = useState(null)

  return <CreateShape 
    name={name}
    datatype={dataType}
    shape={shapePhysics}
    mass={mass}
    parms={parmeters}
  />
}