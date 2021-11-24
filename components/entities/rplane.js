/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
import { usePlane } from '@react-three/cannon';

export default function RPlane(props) {
  // This reference will give us direct access to the THREE.Mesh object
  //const ref = useRef()
  let ref;
  const [hovered, setHover] = useState(false)

  if(props.isPhysics){
    //const [ref] = usePlane(() => ({ position: [0, 5, 0], ...props }))
    //let [_ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
    let [_ref] = usePlane(() => ({ ...props }))
    ref = _ref;
    //const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  }else{
    ref = useRef()
  }

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
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}