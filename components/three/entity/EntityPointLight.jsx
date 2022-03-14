/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.tabnine.com/code/javascript/classes/react-three-fiber/pointLight

import React,{ useRef } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import {  useHelper } from '@react-three/drei'
import { PointLightHelper } from 'three';

export default function EntityPointLight(props, ref){
  //const ref = useRef();
  if(!ref){
    ref = useRef();
  }

  useHelper(props.visible && ref, PointLightHelper,1,'hotpink')
  

  return (<>
    <pointLight
      ref={ref}
      {...props}
      color={props.parameters.color}
      intensity={props.parameters.intensity}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}
      
      >
    </pointLight>
  </>)
}

export const EntityPointLightRef = React.forwardRef(EntityPointLight);
/*
<axesHelper></axesHelper>
*/