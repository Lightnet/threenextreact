/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html

import Box from "../entities/box";
import Foo from '../entities/foo';
//import CameraTest from '../../entities/cameratest';
import CameraCtrl from '../entities/cameractrl';


import Cube from '../entities/cube';
import Circle from '../entities/circle';
import Cone from '../entities/cone';
import Camera from '../entities/camera';
import RPointLight from "../entities/rpointlight";


export function buildModel(item){
  if(item.type=="cube"){
    //console.log("FOUND CUBE");
    return(<Cube
      key={item.id}
      visible={item.visible }
      
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
    >
    </Cube>)
  }else if(item.type=="circle"){
    return(<Circle
      key={item.id}
      visible={item.visible }
      
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
    >
    </Circle>)
  }else if(item.type=="cone"){
    return(<Cone
      key={item.id}
      visible={item.visible }
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}

    >
    </Cone>)
  }else if(item.type=="camera"){
    return(<Camera
      key={item.id}
      visible={item.visible }
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}

    >
    </Camera>)
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
    return(<Cube
      position={[0, 0, 0]}
    >
    </Cube>)
  }

}