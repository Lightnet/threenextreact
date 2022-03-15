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
  const [fontSize, setfontSize] = useState(16.5);
  const [maxWidth, setMaxWidth] = useState(100);
  const [lineHeight, setlineHeight] = useState(0.75);
  const [letterSpacing, setletterSpacing] = useState(-0.08);
  const [textAlign, settextAlign] = useState("left");

  //useEffect(()=>{
    //setColor(props.parameters.color)
  //},[props?.parameters?.color])

  return (<>
    <React.Suspense fallback={null}>
      <Text 
        {...props}
        color="gray" 
        direction="auto"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        //anchorX="center" 
        //anchorY="middle"
        >
        hello world!
      </Text>
    </React.Suspense>
  </>)
}

export const EntityText2DRef = React.forwardRef(EntityText2D);
/*
<Text
      color={color}
      fontSize={fontSize}
      maxWidth={(viewport.width / 100) * maxWidth}
      //lineHeight={lineHeight}
      //letterSpacing={letterSpacing}
      //textAlign={textAlign}
      //font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle">
      Test
    </Text>
*/