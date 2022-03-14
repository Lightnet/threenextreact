/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useHelper } from '@react-three/drei';
import React,{ useRef, useEffect, useState } from 'react';
import { CameraHelper } from 'three';

export default function EntityOrthographicCamera(props, ref){
  //const ref = useRef()
  if(!ref){
    ref = useRef();
  }

  useHelper(props.visible && ref, CameraHelper,1,'hotpink')

  //const [params, setParams] = useState([])

  //useEffect(()=>{
    //setParams(Object.keys(props.parameters).reduce((previousValue, idx)=>{
      //console.log(idx)
      //console.log(props.parameters[idx])
      //return [...previousValue, props.parameters[idx]]
    //} ,[]))
  //},[props.parameters])

  return (<>
    <orthographicCamera 
      ref={ref}
      {...props}
      position={[props.position[0],props.position[1],props.position[2]]}
      //args={params} 
    />
    </>)
}

export const EntityOrthographicCameraRef = React.forwardRef(EntityOrthographicCamera);