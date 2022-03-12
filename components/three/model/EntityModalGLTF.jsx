/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models

import React, { Suspense } from "react";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function EntityModalGLTF(props, ref){

  const gltf = useLoader(GLTFLoader, '/box.gltf')

  return <>
     <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  </>
}

export const EntityModalGLTFRef = React.forwardRef(EntityModalGLTF);