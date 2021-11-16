/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'

export default function CameraCtrl(props){
  const ref = useRef();

  return (
    <>
      <PerspectiveCamera
        makeDefault // Registers it as the default camera system-wide (default=false)
        {...props}
        ref={ref}
        position={[0, 5, 5]} 
        >
      </PerspectiveCamera>
      <OrbitControls camera={ref.current} />
    </>
    )
}