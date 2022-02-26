/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { useBox, useCylinder, usePlane, useSphere } from '@react-three/cannon';
import {DefaultBoxRef} from '../entity/DefaultBox';
import { EntityPlaneRef } from '../entity/EntityPlane';
import { EntityBoxRef } from '../entity/EntityBox';

export default function EntityPhysicsTypes(props) {
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

  if(props.datatype=='box'){
    return (
      <EntityBoxRef
        ref={ref}
        //key={props.objectid}
        {...props}
      />
    )
  }else if(props.dataType=="plane"){
    return(<EntityPlaneRef
      //key={props.objectid}
      {...props}
    />)
  }

  return (
    <DefaultBoxRef
      ref={ref}
      {...props}
    />
  )
}