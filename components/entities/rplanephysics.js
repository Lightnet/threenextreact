/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
import { usePlane } from '@react-three/cannon';

export default function RPlanePhysics(props) {
  // This reference will give us direct access to the THREE.Mesh object
  //const ref = useRef()
  //let ref;
  const [hovered, setHover] = useState(false)
  //if((props.isPhysics == true)&&(props.enablePhysics == true)){
    //ref=null;
    //let [_ref] = usePlane(() => ({ ...props }))
    //ref = _ref;
  const [ref] = usePlane(() => ({ ...props }))
  //}else{
    //if(!ref){
    //ref = useRef({ ...props })
    //}
  //}

  useEffect(()=>{
    return ()=>{
      ref=null;
    }
  },[])

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