/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, PositionalAudio, useHelper } from '@react-three/drei'
import { CameraHelper } from 'three';

export default function Camera(props){
  const ref = useRef();

  useHelper(ref, CameraHelper,1,'hotpink')

  return (
  <>
    <PerspectiveCamera
      makeDefault={false} // Registers it as the default camera system-wide (default=false)
      {...props}
      ref={ref}
      >
    </PerspectiveCamera>
  </>
  )
}
/*
<shadowCameraHelper></shadowCameraHelper>
<axesHelper></axesHelper>
*/