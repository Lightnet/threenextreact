/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://codesandbox.io/s/react-three-fiber-react-spring-30lfq?file=/src/index.js:897-1316
// https://github.com/pmndrs/react-three-fiber/issues/150

import { OrbitControls, TransformControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { EditorContext, useEditor } from '../context/EditorProvider';
import { useEntity } from '../context/EntityProvider';

export default function EntityTransformControl(props,ref){

  //const orbit = useRef()
  const transform = useRef(null)
  const { camera, gl } = useThree()
  //const [ref, mesh] = useResource()
  const meshRef = useRef(null)
  const editor = React.useContext(EditorContext)

  const {
      enableOrbitControl
    , setEnableOrbitControl
  } = editor;

  //useFrame(() => orbit.current.update())
  
  useEffect(() => {
    if (transform.current) {
      const controls = transform.current
      const callback = event => {
        //(orbit.current.enabled = !event.value)
        //console.log(event.value);
        setEnableOrbitControl(!event.value)
      }
      controls.addEventListener('dragging-changed', callback)
      return () => controls.removeEventListener('dragging-changed', callback)
    }
  })
  

  return (<>
    <mesh ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshNormalMaterial attach="material" />
    </mesh>
    {
    meshRef.current && <TransformControls ref={transform} args={[camera, gl.domElement]} onUpdate={self => self.attach(meshRef.current)} />
    }
  </>)
}
export const EntityTransformControlRef = React.forwardRef(EntityTransformControl);
/*
<mesh ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshNormalMaterial attach="material" />
    </mesh>
    <OrbitControls ref={orbit} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.1} />
    {meshRef.current && <TransformControls ref={transform} args={[camera, gl.domElement]} onUpdate={self => self.attach(meshRef.current)} />}
*/