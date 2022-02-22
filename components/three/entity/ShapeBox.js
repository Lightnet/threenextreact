/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useState } from 'react';

export default function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef();

  function clickObject(event){
    //console.log(event);
    console.log("REF: ",ref);
    console.log(props);
  }

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={ref}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}

      onClick={clickObject}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      >

      <boxGeometry args={[
        props.parameters.width, 
        props.parameters.height, 
        props.parameters.depth,
        props.parameters.widthSegments,
        props.parameters.heightSegments,
        props.parameters.depthSegments
        ]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

