/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/pmndrs/use-cannon

import { useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
import { useBox, useCylinder, usePlane, useSphere } from '@react-three/cannon';
import GBox from './gbox';
import GPlane from './gplane';
import GSphere from './gsphere';
import GCylinder from './gcylinder';

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

  if(props.shapePhysics=='sphere'){
    [ref] = useSphere(() => ({ ...props }));
  }

  if(props.shapePhysics=='cylinder'){
    [ref] = useCylinder(() => ({ ...props }));
  }

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