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


export function buildModel(item){
  //console.log(item)
  if(item.type=="box"){
    //console.log("FOUND CUBE");
    let value = {
      objectid:item.objectid,
      isPhysics:item.isPhysics,
      mass:item.mass,
    };
    return(<RBox
      key={item.objectid}
      //visible={item.visible }
      //position={item.position}
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
      //{...item}
      {... value}
    >
    </RBox>)
  }else if(item.type=="plane"){
    let value = {
      objectid:item.objectid,
      isPhysics:item.isPhysics,
      mass:item.mass,
    };

    return(<RPlane
      key={item.objectid}
      visible={item.visible }
      
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
      {... value}
    >
    </RPlane>)
  }else if(item.type=="circle"){
    return(<RCircle
      key={item.objectid}
      visible={item.visible }
      
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
    >
    </RCircle>)
  }else if(item.type=="cone"){
    return(<RCone
      key={item.objectid}
      visible={item.visible }
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}

    >
    </RCone>)
  }else if(item.type=="camera"){
    return(<RCamera
      key={item.objectid}
      visible={item.visible }
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}

    >
    </RCamera>)
  }else if(item.type=="pointlight"){
    return(<RPointLight
      key={item.objectid}
      visible={item.visible }
      position={[item.position[0],item.position[1],item.position[2]]}
      rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      scale={[item.scale[0],item.scale[1],item.scale[2]]}
    >
    </RPointLight>)
  }else{
    return(<Box
      key={item.objectid}
      position={[item.position[0],item.position[1],item.position[2]]}
    >
    </Box>)
  }

}