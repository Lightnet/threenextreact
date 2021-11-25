/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html

import Box from "../entities/box";
//import Foo from '../entities/foo';
//import CameraTest from '../../entities/cameratest';
import ROrbitControl from '../entities/rorbitcontrol';

import RPlane from '../entities/rplane';
import RBox from '../entities/rbox';
import RCircle from '../entities/rcircle';
import RCone from '../entities/rcone';
import RCamera from '../entities/rcamera';
import RPointLight from "../entities/rpointlight";
import RAmbientLight from "../entities/rambientlight";


export function buildModel(item){
  //console.log(item)

  let props = {
    objectid:item.objectid,
    isPhysics:item.isPhysics,
    mass:item.mass,
    visible:item.visible
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

  if(item.type=="box"){
    //console.log("FOUND CUBE");
    
    return(<RBox
      key={item.objectid}
      {... props}
    >
    </RBox>)
  }else if(item.type=="plane"){
    return(<RPlane
      key={item.objectid}
      {... props}
    >
    </RPlane>)
  }else if(item.type=="circle"){
    return(<RCircle
      key={item.objectid}
      {... props}
    >
    </RCircle>)
  }else if(item.type=="cone"){
    return(<RCone
      key={item.objectid}
      {... props}
    >
    </RCone>)
  }else if(item.type=="camera"){
    return(<RCamera
      key={item.objectid}
      {... props}
    >
    </RCamera>)
  }else if(item.type=="pointlight"){
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
  }else{
    return(<Box
      key={item.objectid}
      {... props}
    >
    </Box>)
  }

}