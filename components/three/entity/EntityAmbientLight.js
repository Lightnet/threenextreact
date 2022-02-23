/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useHelper } from '@react-three/drei';
import React,{ useRef} from 'react';
import {  useHelper } from '@react-three/drei'
import { PointLightHelper } from 'three';

export default function EntityAmbientLight(props){

  const ref = useRef();

  useHelper(ref, PointLightHelper,1,'hotpink');

  return (
  <>
    <ambientLight
      ref={ref}
      color={props.parameters.color}
      intensity={props.parameters.intensity}
      {...props}
      >
    </ambientLight>
  </>
  )
}