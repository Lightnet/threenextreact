/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models

import React from "react";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useLoader } from '@react-three/fiber'

export default function EntityModalFBX(props, ref){

  const fbx = useLoader(FBXLoader, '/box.fbx')

  return <>
     <primitive object={fbx} />
  </>
}

export const EntityModalFBXRef = React.forwardRef(EntityModalFBX);