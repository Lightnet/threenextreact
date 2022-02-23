/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import DefaultBox from "./entity/DefaultBox";
import EntityGroup from "./entity/EntityGroup";
import EntityObject3D from "./entity/EntityObject3D";
import EntityPlane from "./entity/EntityPlane";
import EntityScene from "./entity/EntityScene";

export default function EntityRenderModel(entity){

  let props = entity;

  /*
  let props = {
    isPhysics:item.isPhysics || false,
    enablePhysics:item.enablePhysics || false,
  };
  if(item.material){
    props.material=item.material
  }
  if(item.isPhysics == true){
    props.position=item.position;
    props.rotation=item.rotation;
    props.scale=item.scale;
  }else{
    //props.position=item.position;
    props.position=[item.position[0],item.position[1],item.position[2]]
    props.rotation=[item.rotation[0],item.rotation[1],item.rotation[2]]
    props.scale=[item.scale[0],item.scale[1],item.scale[2]]
  }
  */
  //console.log("entity.dataType////////////////");
  //console.log(entity.dataType);
  //console.log(entity.objectid);
  //console.log(entity);

  if(entity.dataType=="object3d"){
    //console.log("entity.datatype////////////////");
    //console.log(entity.dataType);
    return(<EntityObject3D
      key={entity.objectid}
      {...props}
    />)
  }else if(entity.dataType=="group"){
    return(<EntityGroup
      key={entity.objectid}
      {...props}
    />)
  }else if(entity.dataType=="scene"){
    return(<EntityScene
      key={entity.objectid}
      {...props}
    />)
  }else if(entity.dataType=="plane"){
    return(<EntityPlane
      key={entity.objectid}
      {...props}
    />)
  }

  //if there object is not found add it.
  return(<DefaultBox key={entity.objectid} {...props} />)
}