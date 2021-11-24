/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html

import Box from "../entities/box";
//import Foo from '../entities/foo';
//import CameraTest from '../../entities/cameratest';
import CameraCtrl from '../entities/rorbitcontrol';

import RBox from '../entities/rbox';
import RCircle from '../entities/rcircle';
import RCone from '../entities/rcone';
import RCamera from '../entities/rcamera';
import RPointLight from "../entities/rpointlight";


export function buildModel(item){

  if(item.type=="cube"){
    //console.log("FOUND CUBE");
    return(<RBox
      key={item.id}
      visible={item.visible }
      
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
      //{...item}
    >
    </RBox>)
  }else if(item.type=="circle"){
    return(<RCircle
      key={item.id}
      visible={item.visible }
      
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
    >
    </RCircle>)
  }else if(item.type=="cone"){
    return(<RCone
      key={item.id}
      visible={item.visible }
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}

    >
    </RCone>)
  }else if(item.type=="camera"){
    return(<RCamera
      key={item.id}
      visible={item.visible }
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}

    >
    </RCamera>)
  }else if(item.type=="pointlight"){
    return(<RPointLight
      key={item.id}
      visible={item.visible }
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
    >
    </RPointLight>)
  }else{
    return(<Box
      key={item.id}
      position={[item.position[0],item.position[1],item.position[2]]}
    >
    </Box>)
  }

}