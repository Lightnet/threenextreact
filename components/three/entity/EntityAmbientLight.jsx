/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://github.com/pmndrs/drei#select

import { useHelper } from '@react-three/drei';
import React,{ useRef} from 'react';
import { PointLightHelper } from 'three';

export default function EntityAmbientLight(props, ref){

  //const ref = useRef();
  if(!ref){
    ref = useRef();
  }

  //useHelper(ref, PointLightHelper,1,'hotpink')

  return (<>
    <ambientLight
      ref={ref}
      color={props.parameters.color}
      intensity={props.parameters.intensity}
      {...props}
      >
    </ambientLight>
  </>)
}

export const EntityAmbientLightRef = React.forwardRef(EntityAmbientLight);