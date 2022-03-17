/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models

import React, { Suspense, useEffect, useRef, useState } from "react";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useLoader } from '@react-three/fiber'

export default function EntityModalFBX(props, ref){

  const [meshObj, setMeshObj] = useState(null);

  //const fbx = useLoader(FBXLoader, props.parameters.url);// here
  useEffect(()=>{
    try {
      console.log("FBX MESH LOADED...", props.parameters.url)
      const loader = new FBXLoader();
      loader.load(props.parameters.url, (fbx) => {
        fbx.scale.setScalar(0.1);
        fbx.traverse(c => {
          c.castShadow = true;
        });
        console.log("Adding FBX resource to the scene.");
        //scene.add(fbx);
        console.log(fbx)
        setMeshObj(fbx);
      })
    } catch (error) {
      //setMeshObj(null);
      console.log("FBX MESH FAIL...",error)
      //setIsLoaded(false)
    }
  },[props.parameters.url])
  
  return <>

    <Suspense fallback={null}>
      {
      meshObj &&
      <primitive object={meshObj}
        {...props}
        ref={ref}
        position={[props.position[0],props.position[1],props.position[2]]}
        rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
        scale={[props.scale[0],props.scale[1],props.scale[2]]}
      />
      
      }
    </Suspense>
  </>
}

export const EntityModalFBXRef = React.forwardRef(EntityModalFBX);