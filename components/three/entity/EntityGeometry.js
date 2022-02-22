/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef } from 'react';
import DefaultBox,{DefaultBoxRef} from './DefaultBox';
import ShapeBox from "./ShapeBox";

export default function EntityGeometry(props){
  // This reference will give us direct access to the THREE.Mesh object
  const ref= useRef()

  if(props.datatype=='box'){
    return (
      <ShapeBox
        ref={ref}
        {...props}
      />
    )
  }

  return (
    <DefaultBoxRef
      ref={ref}
      {...props}
    />
  )
}