/*
  LICENSE: MIT
  Created by: Lightnet
  Information:
    Not used or there will be conflict object3D
*/

// https://github.com/pmndrs/react-three-fiber/discussions/437

import React,{ useRef } from 'react';

export default function EntityObject3D(props,ref) {
  // This reference will give us direct access to the THREE.Mesh object
  //const ref = useRef();
  if(!ref){
    ref = useRef();
  }
  return (
    <object3D key={props.objectid}
      {...props}
      ref={ref}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}
      >
    </object3D>
  )
}

export const EntityObject3DRef = React.forwardRef(EntityObject3D);