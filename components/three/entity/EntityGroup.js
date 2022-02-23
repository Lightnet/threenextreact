/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useState } from 'react';

export default function EntityGroup(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef();

  return (
    <group 
      //key={props.objectid}
      {...props}
      ref={ref}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}
      >
    </group>
  )
}
/*

*/
export const EntityGroupRef = React.forwardRef((props, ref) => {

  return (
    <group key={props.objectid}
      {...props}
      ref={ref}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}
      >
    </group>
  )
});
// DefaultBoxRef;

