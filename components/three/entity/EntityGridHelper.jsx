/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useRef, useState } from 'react';

export default function EntityGridHelper(props,ref) {
  // This reference will give us direct access to the THREE.Mesh object
  if(!ref){
    ref = useRef();
  }
  const [color, setColor] = useState("gray");

  //useEffect(()=>{
    //setColor(props.parameters.color)
  //},[props?.parameters?.color])

  return (<gridHelper />)
}

export const EntityGridHelperRef = React.forwardRef(EntityGridHelper);