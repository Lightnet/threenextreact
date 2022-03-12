/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models

import React from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'

export default function EntityModalOBJ(props, ref){

  const obj = useLoader(OBJLoader, '/box.obj')

  return <>
     <primitive object={obj} />
  </>
}

export const EntityModalOBJRef = React.forwardRef(EntityModalOBJ);