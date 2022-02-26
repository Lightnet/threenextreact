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
import { EntityAmbientLightRef } from '../entity/EntityAmbientLight';
import { EntityBoxRef } from '../entity/EntityBox';
import { EntityPlaneRef } from '../entity/EntityPlane';

export default function EntityObjectTypes(props){
  // This reference will give us direct access to the THREE.Mesh object
  const ref= useRef()

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
  }else if(props.dataType=="ambientlight"){
    return(<EntityAmbientLightRef
      //key={props.objectid}
      {...props}
    />)
  }

  return (
    <DefaultBoxRef
      ref={ref}
      //key={props.objectid}
      {...props}
    />
  )
}