/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useHelper } from '@react-three/drei';
import React,{ useRef} from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import {  useHelper } from '@react-three/drei'
import { PointLightHelper } from 'three';

export default function RAmbientLight(props){

  const ref = useRef();

  useHelper(ref, PointLightHelper,1,'hotpink');

  return (
  <>
    <ambientLight
      {...props}
      ref={ref}
      >
    </ambientLight>
  </>
  )
}