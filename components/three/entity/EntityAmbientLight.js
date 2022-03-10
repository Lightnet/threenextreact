/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://github.com/pmndrs/drei#select

import React,{ useRef} from 'react';

export default function EntityAmbientLight(props, ref){

  //const ref = useRef();
  if(!ref){
    ref = useRef();
  }

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

export const EntityAmbientLightRef = React.forwardRef(EntityAmbientLight);