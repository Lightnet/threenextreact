/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import DefaultBox from "./entity/DefaultBox";
import EntityBox from "./entity/EntityBox";
import EntityGroup from "./entity/EntityGroup";
import EntityObject3D from "./entity/EntityObject3D";
import EntityPlane from "./entity/EntityPlane";
import EntityScene from "./entity/EntityScene";
import EntityCone from "./entity/EntityCone";
import EntityLight from "./entity/EntityLight";
import EntityPointLight from "./entity/EntityPointLight";
import EntityAmbientLight from "./entity/EntityAmbientLight";
import EntitySphere from "./entity/EntitySphere";
//import { useEntity } from "./context/EntityProvider";

export default function EntityRenderModel(entity){

  //const{ enablePhysics, setEnablePhysics } = useEntity();

  let props = entity;
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
  }else if(entity.dataType=="box"){
    return(<EntityBox
      key={entity.objectid}
      {...props}
    />)
  }else if(entity.dataType=="cone"){
    return(<EntityCone
      key={entity.objectid}
      {...props}
    />)
  }else if(entity.dataType=="light"){
    return(<EntityLight
      key={entity.objectid}
      {...props}
    />)
  }else if(entity.dataType=="pointlight"){
    return(<EntityPointLight
      key={entity.objectid}
      {...props}
    />)
  }else if(entity.dataType=="ambientlight"){
    return(<EntityAmbientLight
      key={entity.objectid}
      {...props}
    />)
  }else if(entity.dataType=="sphere"){
    return(<EntitySphere
      key={entity.objectid}
      {...props}
    />)
  }

  //if there object is not found add it.
  return(<DefaultBox key={entity.objectid} {...props} />)
}