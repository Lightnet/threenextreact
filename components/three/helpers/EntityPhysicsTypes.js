/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { useBox, useCylinder, usePlane, useSphere } from '@react-three/cannon';
import {DefaultBoxRef} from '../entity/DefaultBox';
//import { EntityPlaneRef } from '../entity/EntityPlane';
//import { EntityBoxRef } from '../entity/EntityBox';

import EntityComponets from "../context/EntityComponets";
import API from '../context/API.mjs';
const ENTITIES = EntityComponets.ENTITIES;
//console.log(ENTITIES);

export default function EntityPhysicsTypes(props) {
  let ref;

  if(props.shapePhysics==API.SHAPETYPES.BOX){
    //console.log("shapePhysics BOX?")
    //console.log(props);
    [ref] = useBox(() => ({ ...props }));
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

  for(let idx in ENTITIES){
    if(ENTITIES[idx].dataType==props.dataType){
      const Comp = ENTITIES[idx].compRef;
      return <Comp ref={ref} {...props} />
    }
  }

  /*
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
  */

  return (
    <DefaultBoxRef
      ref={ref}
      {...props}
    />
  )
}