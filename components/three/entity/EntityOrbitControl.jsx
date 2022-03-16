/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef } from 'react';
import { PerspectiveCamera, OrbitControls} from '@react-three/drei';
import EntityText2D from './EntityText2D';

export default function EntityOrbitControl(props){

  const ref = useRef();

  return (<>
    <PerspectiveCamera
      makeDefault // Registers it as the default camera system-wide (default=false)
      {...props}
      ref={ref}
      position={[0, 5, 5]} 
      >
      <EntityText2D
        position={[0, 0.4, -1]}
      />
    </PerspectiveCamera>
    <OrbitControls 
      enabled={props.enabled}
      enablePan={true}
      enableZoom={true} 
      enableRotate={true}
      enableDamping={false}
      camera={ref.current} 
      />
  </>)
}