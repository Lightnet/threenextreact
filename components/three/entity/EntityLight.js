/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.tabnine.com/code/javascript/classes/react-three-fiber/pointLight
// https://threejs.org/docs/#api/en/lights/Light

import React,{ useRef } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import {  useHelper } from '@react-three/drei'
import { PointLightHelper } from 'three';

export default function EntityLight(props){
  const ref = useRef();

  useHelper(ref, PointLightHelper,1,'hotpink')

  return (
  <>
    <light
      ref={ref}
      {...props}
      >
    </light>
  </>
  )
}
/*
<shadowCameraHelper></shadowCameraHelper>
<axesHelper></axesHelper>
*/