/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useRef, useState } from 'react';

export default function EntityArrowHelper(props,ref) {
  // This reference will give us direct access to the THREE.Mesh object
  if(!ref){
    ref = useRef();
  }
  const [color, setColor] = useState("gray");

  //useEffect(()=>{
    //setColor(props.parameters.color)
  //},[props?.parameters?.color])

  return (<arrowHelper />)
}

export const EntityArrowHelperRef = React.forwardRef(EntityArrowHelper);