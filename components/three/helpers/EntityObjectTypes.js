/*
  LICENSE: MIT
  Created by: Lightnet

three objects:
object3d
group
scene
plane
box
cone
light
pointlight
ambientlight
sphere
*/

import React,{ useRef } from 'react';
import { DefaultBoxRef } from '../entity/DefaultBox';
//import { EntityAmbientLightRef } from '../entity/EntityAmbientLight';
//import { EntityBoxRef } from '../entity/EntityBox';
//import { EntityPlaneRef } from '../entity/EntityPlane';

import EntityComponets from "../context/EntityComponets";

const ENTITIES = EntityComponets.ENTITIES;
//console.log(ENTITIES);

export default function EntityObjectTypes(props){
  // This reference will give us direct access to the THREE.Mesh object
  const ref= useRef()

  for(let idx in ENTITIES){
    //console.log(ENTITIES[idx]);
    //console.log("props.datatype: ",props.dataType);
    //console.log("ENTITIES[idx].dataType: ",ENTITIES[idx].dataType);
    if(ENTITIES[idx].dataType==props.dataType){
      //console.log(ENTITIES[idx]);
      const Comp = ENTITIES[idx].compRef;
      //console.log(Comp)
      return <Comp ref={ref} {...props} />
    }
  }

  // need to double check?
  return (
    <DefaultBoxRef
      ref={ref}
      //key={props.objectid}
      {...props}
    />
  )
}