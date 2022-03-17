/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/pmndrs/react-three-fiber/discussions/519

import React,{ useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';

export default function EntityArrowHelper(props,ref) {
  // This reference will give us direct access to the THREE.Mesh object
  if(!ref){
    ref = useRef();
  }

  const [params, setParams] = useState([])

  useEffect(()=>{
    const dir = new Vector3( 0, 1, 0 );
    dir.normalize();
    //const origin = new Vector3( 0, 0, 0 );
    //const dir = [ 0, 1, 1 ];
    const origin = [ 0, 0, 0 ];
    const length = 2;
    const hex = "#8B0000";

    setParams([
      dir,
      origin,
      length,
      hex
    ])
    /*
    setParams(Object.keys(props.parameters).reduce((previousValue, idx)=>{
      //console.log(idx)
      //console.log(props.parameters[idx])
      return [...previousValue, props.parameters[idx]]
    } ,[]))
    */
  },[props.parameters])

  //console.log(params);
  
  return (<arrowHelper
    //{...props}
    ref={ref}
    args={params}
    position={[props.position[0],props.position[1],props.position[2]]}
    rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
    scale={[props.scale[0],props.scale[1],props.scale[2]]}
  />)
}

export const EntityArrowHelperRef = React.forwardRef(EntityArrowHelper);