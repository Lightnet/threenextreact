/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/pmndrs/use-cannon

import { useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
import { useBox } from '@react-three/cannon';

export default function RBoxPhysics(props) {
  
  // This reference will give us direct access to the THREE.Mesh object
  // const ref = useRef();
  let ref;
  
  let [_ref] = useBox(() => ({ ...props }))
  //const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  ref = _ref;


  if(!ref){
    ref = useRef({ ...props })
  }

  const [hovered, setHover] = useState(false);

  //const [active, setActive] = useState(false)
  //console.log("ref.current.position")
  //if(ref.current){
    //console.log(ref.current.position)
  //}
  //useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  function clickObject(event){
    //console.log(event);
    console.log("REF: ",ref);
    console.log(props);
  }

  return (
    <mesh
      {...props}
      ref={ref}
      //scale={active ? 1.5 : 1}
      onClick={clickObject}
      //onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}