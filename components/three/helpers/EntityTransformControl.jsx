/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://codesandbox.io/s/react-three-fiber-react-spring-30lfq?file=/src/index.js:897-1316
// https://github.com/pmndrs/react-three-fiber/issues/150
// https://threejs.org/examples/#misc_controls_transform
// https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_transform.html
// https://github.com/pmndrs/drei/blob/master/src/core/TransformControls.tsx

// https://threejs.org/docs/?q=scene#api/en/core/Object3D

import { OrbitControls, TransformControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { EditorContext, useEditor } from '../context/EditorProvider';
import { useEntity } from '../context/EntityProvider';

export default function EntityTransformControl(props,ref){

  //const orbit = useRef()
  const transform = useRef(null)
  const { camera, gl, scene } = useThree()
  //const [ref, mesh] = useResource()
  const meshRef = useRef(null)
  const selectMesh = useRef(null)
  const editor = React.useContext(EditorContext)

  const {
      enableOrbitControl
    , setEnableOrbitControl
    , selectObjectID
    , selectObjectUUID
  } = editor;

  //useFrame(() => orbit.current.update())

  useEffect(()=>{
    console.log(selectObjectUUID)
    //let meshobj = scene.getObjectById(selectObjectUUID);
    let meshobj = scene.getObjectByProperty('uuid',selectObjectUUID);
    console.log(meshobj);
    if(meshobj){
      console.log(meshobj.position)
      console.log(meshRef.current.position)
      let pos = meshobj.position
      meshRef.current.parent.position.set(pos.x,pos.y,pos.z);
      //meshRef.current.position = meshobj.position;
      //meshRef.current = meshobj;
      selectMesh.current = meshobj;      
    }

  },[selectObjectUUID])

  useEffect(() => {
    if(meshRef.current){
      if(selectMesh.current){
        console.log("update?")
        //update when transform but not update object on move time.
        let pos = meshRef.current.parent.position
        console.log(meshRef.current);
        console.log(meshRef.current.position);
        selectMesh.current.position.set(pos.x,pos.y,pos.z);
      }
    }
  })

  
  useEffect(() => {

    if (transform.current) {
      const controls = transform.current
      const callback = event => {
        //(orbit.current.enabled = !event.value)
        //console.log(event.value);
        setEnableOrbitControl(!event.value)
      }
      function controlTransform(e){
        console.log(e.code)
        switch ( e.code ) {
          case 'KeyW': // W
            controls.setMode( 'translate' );
						break;
					case 'KeyE': // E
            controls.setMode( 'rotate' );
						break;
					case 'KeyR': // R
            controls.setMode( 'scale' );
						break;
          case 'Escape': // Esc
            //controls.reset(); // nope
            break;
        }
      }
      window.addEventListener( 'keydown', controlTransform);
      controls.addEventListener('dragging-changed', callback)
      return () => {
        controls.removeEventListener('dragging-changed', callback)
        window.removeEventListener('keydown',controlTransform)
      }
    }
  })
  

  return (<>
    
    <mesh ref={meshRef}>  
      {/*
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshNormalMaterial attach="material" />
      
      */}
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