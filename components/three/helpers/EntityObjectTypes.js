/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef } from 'react';
import { DefaultBoxRef } from '../entity/DefaultBox';
import { ENTITIES } from "../context/EntityComponets";

export default function EntityObjectTypes(props){
  // This reference will give us direct access to the THREE.Mesh object
  const ref= useRef()

  for(let idx in ENTITIES){
    //console.log(ENTITIES[idx]);
    //console.log("props.datatype: ",props.dataType);
    //console.log("ENTITIES[idx].dataType:",ENTITIES[idx].dataType)
    if(ENTITIES[idx].dataType==props.dataType){
      const Comp = ENTITIES[idx].compRef;
      return <Comp ref={ref} {...props} />
    }
  }

  //if not found return box object render
  return (
    <DefaultBoxRef
      ref={ref}
      {...props}
    />
  )
}