/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://threejs.org/docs/index.html#api/en/helpers/PolarGridHelper
// https://stackoverflow.com/questions/66664209/how-can-i-use-forwardref-in-react

import React,{ useRef, useEffect, useState } from 'react';
import GBox from './gbox';
import GCylinder from './gcylinder';
import GPlane from './gplane';
import GSphere from './gsphere';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
//import { useBox } from '@react-three/cannon';

export default function REntityGeometry(props) {
  
  // This reference will give us direct access to the THREE.Mesh object
  const ref= useRef()
  //const ref= useRef({...props})
  //const ref= useRef()
  //const [hovered, setHover] = useState(false);

  if(props.datatype=='box'){
    return (
      <GBox 
        ref={ref}
        {...props}
      />
    )
  }

  if(props.datatype=='plane'){
    return (
      <GPlane 
        ref={ref}
        {...props}
      />
    )
  }

  if(props.datatype=='sphere'){
    return (
      <GSphere
        ref={ref}
        {...props}
      />
    )
  }

  if(props.datatype=='cylinder'){
    return (
      <GCylinder
        ref={ref}
        {...props}
      />
    )
  }
}