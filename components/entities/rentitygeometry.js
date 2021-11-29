/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://threejs.org/docs/index.html#api/en/helpers/PolarGridHelper
// https://stackoverflow.com/questions/66664209/how-can-i-use-forwardref-in-react

import { useRef, useEffect, useState } from 'react';
import GBox from './gbox';
import GPlane from './gplane';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
//import { useBox } from '@react-three/cannon';

export default function REntityGeometry(props) {
  
  // This reference will give us direct access to the THREE.Mesh object
  const ref= useRef()
  //const ref= useRef({...props})
  //const ref= useRef()
  //const [hovered, setHover] = useState(false);

  if(props.type=='box'){
    return (
      <GBox 
        ref={ref}
        {...props}
      />
    )
  }

  if(props.type=='plane'){
    return (
      <GPlane 
        ref={ref}
        {...props}
      />
    )
  }
}