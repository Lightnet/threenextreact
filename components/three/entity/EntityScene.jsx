/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useState } from 'react';

export default function EntityScene(props, ref) {
  // This reference will give us direct access to the THREE.Mesh object
  //const ref = useRef();
  if(!ref){
    ref = useRef();
  }

  return (
    <scene 
      //key={props.objectid}
      {...props}
      ref={ref}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}
      >
    </scene>
  )
}

export const EntitySceneRef = React.forwardRef(EntityScene);