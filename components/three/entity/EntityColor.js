/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useRef, useState } from 'react';

export default function EntityColor(props,ref) {
  // This reference will give us direct access to the THREE.Mesh object
  if(!ref){
    ref = useRef();
  }
  const [color, setColor] = useState("gray");

  useEffect(()=>{
    setColor(props.parameters.color)
  },[props?.parameters?.color])

  return (<color attach="background" args={[color]} />)
}

export const EntityColorRef = React.forwardRef(EntityColor);