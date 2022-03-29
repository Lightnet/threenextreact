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

import { TransformControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useContext } from 'react'
import { isEmpty } from '../../../lib/helper.mjs';
import { EditorContext, useEditor } from '../context/EditorProvider';
import { EntityContext } from '../context/EntityProvider';

export default function EntityTransformControl(props,ref){

  const transform = useRef(null)
  const { camera, gl, scene } = useThree()
  const meshRef = useRef(null)
  const selectMesh = useRef(null)
  const editor = useContext(EditorContext)
  const entityContext = useContext(EntityContext);
  const {dispatchEntity} = entityContext;

  const {
      enableOrbitControl
    , setEnableOrbitControl
    , selectObjectID //this for update object transform
    , selectObjectUUID
  } = editor;

  useEffect(()=>{
    //console.log(selectObjectUUID)
    let meshobj = scene.getObjectByProperty('uuid',selectObjectUUID);
    if(meshobj){
      transform.current.attach(meshobj)
    }else{
      transform.current.detach();
    }
  },[selectObjectUUID])

  const callback = event => {
    //(orbit.current.enabled = !event.value)
    //console.log(event.value);
    setEnableOrbitControl(!event.value)
    if(event.value==false){
      if((transform.current!=null)&&(isEmpty(selectObjectID) == false)){
        console.log(transform.current.mode)
        console.log(transform.current)
        console.log(transform.current.object)
        if(transform.current.object == null){//select transform
          return;
        }

        if(transform.current.mode=='translate'){ 
          let pos = transform.current.object.position
          console.log("update entity object")
          dispatchEntity({
              type:"update"
            , id: selectObjectID
            , keyType:"position"
            , value: [pos.x,pos.y,pos.z]
          })
        }
        if(transform.current.mode=='rotate'){ 
          let rot = transform.current.object.rotation
          console.log("update entity object")
          dispatchEntity({
              type:"update"
            , id: selectObjectID
            , keyType:"rotation"
            , value: [rot.x,rot.y,rot.z]
          })
        }
        if(transform.current.mode=='scale'){ 
          let scale = transform.current.object.scale
          console.log("update entity object")
          dispatchEntity({
              type:"update"
            , id: selectObjectID
            , keyType:"scale"
            , value: [scale.x,scale.y,scale.z]
          })
        }
        
      }
    }
  }

  useEffect(() => {
    if (transform.current) {
      const controls = transform.current
      
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
    </mesh>
    {
    //meshRef.current && <TransformControls ref={transform} args={[camera, gl.domElement]} onUpdate={self => self.attach(meshRef.current)} />
    <TransformControls ref={transform} args={[camera, gl.domElement]} />
    }
  </>)
}
export const EntityTransformControlRef = React.forwardRef(EntityTransformControl);