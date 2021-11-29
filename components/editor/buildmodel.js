/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html

import Box from "../entities/box";
//import Foo from '../entities/foo';
//import CameraTest from '../../entities/cameratest';
import ROrbitControl from '../entities/rorbitcontrol';

import RCircle from '../entities/rcircle';
import RCone from '../entities/rcone';
import RCamera from '../entities/rcamera';
import RPointLight from "../entities/rpointlight";
import RAmbientLight from "../entities/rambientlight";
import REntityPhysics from "../entities/rentityphysics";
import REntityGeometry from "../entities/rentitygeometry";

// https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np

var shapes = [
  'box',
  'plane'
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
    type:item.type,
    shapePhysics:item.shapePhysics
  };
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
  if(checkShape(item.type)){
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

  if(item.type=="camera"){
    return(<RCamera
      key={item.objectid}
      {... props}
    >
    </RCamera>)
  }else if(item.type=="pointlight"){
    //props.color="white";
    //console.log(props);

    return(<RPointLight
      key={item.objectid}
      {... props}
    >
    </RPointLight>)
  }else if(item.type=="ambientlight"){
    return(<RAmbientLight
      key={item.objectid}
      {... props}
    >
    </RAmbientLight>)
  }

  //if there object is not found add it.
  return(<Box
    key={item.objectid}
    {... props}
  />)

}