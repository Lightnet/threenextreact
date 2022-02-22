/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { useBox, useCylinder, usePlane, useSphere } from '@react-three/cannon';
import DefaultBox,{DefaultBoxRef} from './DefaultBox';

export default function EntityPhysics(props) {
  let ref;

  if(props.shapePhysics=='box'){
    //console.log("shapePhysics BOX?")
    //console.log(props);
    [ref] = useBox(() => ({ ...props }));
  }

  if(props.shapePhysics=='plane'){
    [ref] = usePlane(() => ({ ...props }));
  }

  if(props.shapePhysics=='sphere'){
    [ref] = useSphere(() => ({ ...props }));
  }

  if(props.shapePhysics=='cylinder'){
    [ref] = useCylinder(() => ({ ...props }));
  }



  
  return (
    <DefaultBoxRef
      ref={ref}
      {...props}
    />
  )
}