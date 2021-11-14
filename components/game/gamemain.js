/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This will handle loading and query.

*/

// https://stackoverflow.com/questions/38282997/rendering-an-array-map-in-react/38283182
// https://www.thiscodeworks.com/add-property-to-each-object-in-array-javascript-using-map-code-example-undefined/5faa3e49aa4cd50014938e6e
// https://javascript.info/map-set
// https://stackoverflow.com/questions/48131100/react-render-array-of-components

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Foo(props){
  const ref = useRef();
  console.log("test");

  return (
    <mesh
      {...props}
      ref={ref}
      >
    </mesh>
    )
}

export default function GameMain({
  session
}){

  return(<>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  </>);
}
/*

*/
