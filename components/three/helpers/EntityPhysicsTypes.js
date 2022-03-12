/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { useBox, useCylinder, usePlane, useSphere } from '@react-three/cannon';
import {DefaultBoxRef} from '../entity/DefaultBox';

import { ENTITIES } from "../context/EntityComponets";
import API from '../context/API.mjs';

export default function EntityPhysicsTypes(props) {
  let ref;
  //console.log("shapePhysics:", props.shapePhysics)
  //console.log(props);

  if(props.shapePhysics==API.SHAPETYPES.BOX){
    [ref] = useBox(() => ({ ...props, onCollide:onCollide }));
  }

  if(props.shapePhysics==API.SHAPETYPES.PLANE){
    [ref] = usePlane(() => ({ ...props }));
  }

  if(props.shapePhysics==API.SHAPETYPES.SPHERE){
    [ref] = useSphere(() => ({ ...props }));
  }

  if(props.shapePhysics==API.SHAPETYPES.CYLINDER){
    [ref] = useCylinder(() => ({ ...props }));
  }


  const onCollide=(e) => {
    console.log('Collision event on Trigger', e)
  }

  for(let idx in ENTITIES){
    if(ENTITIES[idx].dataType==props.dataType){
      const Comp = ENTITIES[idx].compRef;
      return <Comp ref={ref} {...props} />
    }
  }

  //if not found return box object render
  return (
    <DefaultBoxRef
      ref={ref}
      {...props}
    />
  )
}