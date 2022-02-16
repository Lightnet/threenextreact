/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.tabnine.com/code/javascript/classes/react-three-fiber/pointLight

import { useRef } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import {  useHelper } from '@react-three/drei'
import { PointLightHelper } from 'three';

export default function RPointLight(props){
  const ref = useRef();

  useHelper(ref, PointLightHelper,1,'hotpink')

  //props.color="white";
  //console.log("RPointLight")
  //console.log(props)

  let sprops={
    position: props.position,
    objectid:props.objectid,
    isPhysics:props.isPhysics,
    mass:props.mass,
    visible:props.visible,
  }

  return (
  <>
    <pointLight
      {...sprops}
      ref={ref}
      >
    </pointLight>
  </>
  )
}
/*
<shadowCameraHelper></shadowCameraHelper>
<axesHelper></axesHelper>
*/