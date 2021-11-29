/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/pmndrs/use-cannon

import { useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
import { useBox, usePlane } from '@react-three/cannon';
import GBox from './gbox';
import GPlane from './gplane';

export default function REntityPhysics(props) {
  let ref;

  if(props.shapePhysics=='box'){
    //console.log("shapePhysics BOX?")
    //console.log(props);
    [ref] = useBox(() => ({ ...props }));
  }

  if(props.shapePhysics=='plane'){
    [ref] = usePlane(() => ({ ...props }));
  }

  if(props.type=='box'){
    return (
      <GBox 
        ref={ref}
        {...props}
        //props={props}
      />
    )
  }

  if(props.type=='plane'){
    return (
      <GPlane
        ref={ref}
        {...props}
        //props={props}
      />
    )
  }
}