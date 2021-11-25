/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import {  useHelper } from '@react-three/drei'
import { PointLightHelper } from 'three';

export default function RPointLight(props){
  const ref = useRef();

  useHelper(ref, PointLightHelper,1,'hotpink')

  return (
  <>
    <pointLight
      {...props}
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