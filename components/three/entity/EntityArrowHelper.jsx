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

  const [params, setParams] = useState([])

  useEffect(()=>{
    setParams(Object.keys(props.parameters).reduce((previousValue, idx)=>{
      //console.log(idx)
      //console.log(props.parameters[idx])
      return [...previousValue, props.parameters[idx]]
    } ,[]))
  },[props.parameters])

  console.log(params);


  return (<arrowHelper
    {...props}
    ref={ref}
    args={params}
    position={[props.position[0],props.position[1],props.position[2]]}
    rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
    scale={[props.scale[0],props.scale[1],props.scale[2]]}
  />)
}

export const EntityArrowHelperRef = React.forwardRef(EntityArrowHelper);