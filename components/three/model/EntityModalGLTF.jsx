/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models

import React, { Suspense, useEffect, useState } from "react";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function EntityModalGLTF(props, ref){

  const [meshObj, setMeshObj] = useState(null);
  //const gltf = useLoader(GLTFLoader, '/box.gltf')
  //gltf = useLoader(GLTFLoader, props.parameters.url)
  useEffect(()=>{
    const loader = new GLTFLoader();

    try {
      // Load a glTF resource
      loader.load(
        // resource URL
        props.parameters.url,
        // called when the resource is loaded
        function ( gltf ) {
          console.log(gltf);
          //scene.add( gltf.scene );
          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Group
          gltf.scenes; // Array<THREE.Group>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object
          setMeshObj(gltf.scene);
        },
        // called while loading is progressing
        function ( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
          console.log( 'An error happened' );
          setMeshObj(null);
        }
      );
    } catch (error) {
      console.log(error)
    }
  },[props.parameters.url])
  
  return <>
     <Suspense fallback={null}>
     {meshObj &&
      <primitive object={meshObj} 
        {...props}
        ref={ref}
        position={[props.position[0],props.position[1],props.position[2]]}
        rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
        scale={[props.scale[0],props.scale[1],props.scale[2]]}
      />}
    </Suspense>
  </>
}

export const EntityModalGLTFRef = React.forwardRef(EntityModalGLTF);