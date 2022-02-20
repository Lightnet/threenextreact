/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html
import React from "react";
import Box from "../entity/box";
//import Foo from '../entities/foo';
//import CameraTest from '../../entities/cameratest';
import ROrbitControl from '../entity/rorbitcontrol';

import RCamera from '../entity/rcamera';
import RPointLight from "../entity/rpointlight";
import RAmbientLight from "../entity/rambientlight";
import REntityPhysics from "../entity/rentityphysics";
import REntityGeometry from "../entity/rentitygeometry";

// https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np

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

export function buildModel(item){
  //console.log(item)
  let props = {
    objectid:item.objectid,
    isPhysics:item.isPhysics,
    mass:item.mass,
    visible:item.visible,
    enablePhysics:item.enablePhysics,
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
  
  //console.log(props);
  if(checkShape(item.datatype)){
    //console.log("FOUND!", item.type);
    if((props.isPhysics==true)&&(props.enablePhysics==true)){
      return(<REntityPhysics
        key={item.objectid}
        {... props}
      />)
    }else{
      return(<REntityGeometry
        key={item.objectid}
        {... props}
      />)
    }
  }

  if(item.datatype=="camera"){
    return(<RCamera
      key={item.objectid}
      {... props}
    />)
  }else if(item.datatype=="pointlight"){
    //props.color="white";
    //console.log(props);
    return(<RPointLight
      key={item.objectid}
      {... props}
    />)
  }else if(item.datatype=="ambientlight"){
    return(<RAmbientLight
      key={item.objectid}
      {... props}
    />)
  }else if(item.datatype=="orbitcontrol"){
    return(<ROrbitControl
      key={item.objectid}
      {... props}
    />)
  }

  //if there object is not found add it.
  return(<Box
    key={item.objectid}
    {... props}
  />)

}