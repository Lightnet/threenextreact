/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import DefaultBox from "./entity/DefaultBox";
import ShapeBox from "./entity/ShapeBox";

var shapes = [
  'box'
  , 'plane'
  , 'sphere'
  , 'cylinder'
]

function checkShape(name){
  let bfound = false;
  shapes.forEach(str => {
    if(str == name){
      bfound = true;
    }
  });
  return bfound;
}

export default function EntityRenderModel(item){

  let props = {
    objectid:item.id,
    key:item.id,//needed for key react error fixed
    isPhysics:item.isPhysics || false,
    mass:item.mass,
    visible:item.visible || true,
    enablePhysics:item.enablePhysics || false,
    datatype:item.datatype,
    shapePhysics:item.shapePhysics//,
    //parameters:item.parameters
  };
  if(item.material){
    props.material=item.material
  }
  if(item.parameters){
    props.parameters=item.parameters
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

  //if there object is not found add it.
  return(<DefaultBox key={item.objectid} {...props} />)
}