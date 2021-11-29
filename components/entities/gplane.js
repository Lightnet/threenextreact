/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
//import { usePlane } from '@react-three/cannon';

const GPlane = React.forwardRef((props, ref) => {

  const [hovered, setHover] = useState(false)

  function clickObject(event){
    //console.log(event);
    console.log("REF: ",ref);
    console.log(props);
  }

  return (
    <mesh
      ref={ref}
      {...props}
      //scale={active ? 1.5 : 1}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}

      onClick={clickObject}
      //onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
//}
});
export default GPlane;