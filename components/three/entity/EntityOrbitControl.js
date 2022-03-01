/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef } from 'react';
import { PerspectiveCamera, OrbitControls} from '@react-three/drei';

export default function EntityOrbitControl(props){

  const ref = useRef();

  return (<>
    <PerspectiveCamera
      makeDefault // Registers it as the default camera system-wide (default=false)
      {...props}
      ref={ref}
      position={[0, 5, 5]} 
      >
    </PerspectiveCamera>
    <OrbitControls 
      enablePan={true}
      enableZoom={true} 
      enableRotate={true}
      enableDamping={false}
      camera={ref.current} 
      />
  </>)
}