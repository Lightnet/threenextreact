/*
  LICENSE: MIT
  Created by: Lightnet
  Information: Not use.
*/

// https://www.tabnine.com/code/javascript/classes/react-three-fiber/pointLight
// https://threejs.org/docs/#api/en/lights/Light

import React,{ useRef } from 'react';
import {  useHelper } from '@react-three/drei'
import { PointLightHelper } from 'three';

export default function EntityLight(props, ref){
  //const ref = useRef();
  if(!ref){
    ref = useRef();
  }

  useHelper( props.visible && ref, PointLightHelper,1,'hotpink')

  return (
  <>
    <light
      ref={ref}
      {...props}
      >
    </light>
  </>
  )
}

export const EntityLightRef = React.forwardRef(EntityLight);
/*
<axesHelper></axesHelper>
*/