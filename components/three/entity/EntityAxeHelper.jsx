/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useRef, useState } from 'react';

export default function EntityAxeHelper(props,ref) {
  // This reference will give us direct access to the THREE.Mesh object
  if(!ref){
    ref = useRef();
  }

  const [size, setSize] = useState(1)

  useEffect(()=>{
    if(props.parameters.size!=null){
      setSize(props.parameters.size);
    }
  },[props.parameters])

  return (<axesHelper 
    {...props}
      ref={ref}
      args={[size]}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}
      />)
}

export const EntityAxeHelperRef = React.forwardRef(EntityAxeHelper);