/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://codesandbox.io/s/r3f-troika-text-eb4mx?file=/src/index.js:266-297
// https://www.npmjs.com/package/drei#text
// https://drei.pmnd.rs/?path=/story/abstractions-text--text-st
// https://onion2k.github.io/r3f-by-example/examples/other/text/

import React,{ useEffect, useRef, useState } from 'react';
import {  useThree } from "@react-three/fiber"
import { Text } from '@react-three/drei';
//import { Text } from "@react-three/drei/Text"


export default function EntityText2D(props,ref) {
  // This reference will give us direct access to the THREE.Mesh object
  if(!ref){
    ref = useRef();
  }
  const { viewport } = useThree()
  const [color, setColor] = useState("#EC2D2D");

  return (<>
    <React.Suspense fallback={null}>
      <Text 
        {...props}
        color="gray" 
        direction="auto"
        anchorX="center"
        anchorY="middle"
        //font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        //anchorX="center" 
        //anchorY="middle"
        >
        hello world!
      </Text>
    </React.Suspense>
  </>)
}

export const EntityText2DRef = React.forwardRef(EntityText2D);