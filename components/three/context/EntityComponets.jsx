/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    set up component and object types.

  Note that react is client only. If put on Server side will error.

*/

import { Vector3 } from "three";
import { nanoid32 } from "../../../lib/helper.mjs";
import EntityAmbientLight, { EntityAmbientLightRef } from "../entity/EntityAmbientLight";
import EntityArrowHelper, { EntityArrowHelperRef } from "../entity/EntityArrowHelper.jsx";
import EntityAxesHelper, { EntityAxesHelperRef } from "../entity/EntityAxesHelper.jsx";
import EntityBox, { EntityBoxRef } from "../entity/EntityBox";
import EntityCircle, { EntityCircleRef } from "../entity/EntityCircle";
import EntityColor, { EntityColorRef } from "../entity/EntityColor";
import EntityCone, { EntityConeRef } from "../entity/EntityCone";
import EntityCylinder, { EntityCylinderRef } from "../entity/EntityCylinder";
import EntityGridHelper, { EntityGridHelperRef } from "../entity/EntityGridHelper.jsx";
import EntityGroup, { EntityGroupRef } from "../entity/EntityGroup";
import EntityOrthographicCamera, { EntityOrthographicCameraRef } from "../entity/EntityOrthographicCamera";
import EntityPerspectiveCamera, { EntityPerspectiveCameraRef } from "../entity/EntityPerspectiveCamera";
import EntityPlane, { EntityPlaneRef } from "../entity/EntityPlane";
import EntityPointLight, { EntityPointLightRef } from "../entity/EntityPointLight";
import EntityScene, { EntitySceneRef } from "../entity/EntityScene";
import EntitySphere, { EntitySphereRef } from "../entity/EntitySphere";
import EntityModalFBX, { EntityModalFBXRef } from "../model/EntityModalFBX.jsx";
import EntityModalGLTF, { EntityModalGLTFRef } from "../model/EntityModalGLTF.jsx";
import EntityModalOBJ, { EntityModalOBJRef } from "../model/EntityModalOBJ.jsx";
import API from "./API.mjs";

var ENTITIES=[]
var loaded;
//need to remove this as dev hot reload debug
if(global.ENTITIES){
  loaded=true;
}

if(!loaded){
  //console.log("loaded",loaded)
  //console.log("global",global)
AddCompObjEntity({
  name:"scene"
  , isTransform:true
  , dataType:API.ENTITYTYPES.SCENE
  , comp:EntityScene
  , compRef:EntitySceneRef
  , shape:"BOX"
  , mass:1
  , parameters:[
    {
        autoUpdate:true
      , background:null
      , environment:null
      , fog:null
      , overrideMaterial:null
    }
  ]
})
AddCompObjEntity({
  name:"group"
  , isTransform:true
  , dataType:API.ENTITYTYPES.GROUP
  , comp:EntityGroup
  , compRef:EntityGroupRef
  , shape:"BOX"
  , mass:1
  , parameters:[]
})
AddCompObjEntity({
  name:"box"
  , isTransform:true
  , dataType:API.ENTITYTYPES.BOX
  , comp:EntityBox
  , compRef:EntityBoxRef
  , shape:"BOX"
  , mass:1
  , parameters:[
    {
        width:1
      , height: 1 
      , depth:1 
    },
    {
        width: 1
      , height: 1 
      , depth: 1 
      , widthSegments: 1 
      , heightSegments: 1 
      , depthSegments: 1 
    }
  ],
  material:[{
      index:0
    , objectid:nanoid32()
    , dataType:"meshStandardMaterial"
    , name:"meshStandardMaterial"
    , color:"#ffffff"
    , wireframe:false
  }]
})
AddCompObjEntity({
  name:"circle"
  , isTransform:true
  , dataType:API.ENTITYTYPES.CIRCLE
  , comp:EntityCircle
  , compRef:EntityCircleRef
  , shape:"BOX"
  , mass:1
  , parameters:[
    {
        radius :1
      , segments : 8
    },
    {
        radius :1
      , segments : 8
      , thetaStart : 0
      , thetaLength : 2 * Math.PI
    }
  ],
  material:[{
      index:0
    , objectid:nanoid32()
    , dataType:"meshStandardMaterial"
    , name:"meshStandardMaterial"
    , color:"#ffffff"
    , wireframe:false
  }]
})
AddCompObjEntity({
  name:"cone"
  , dataType:API.ENTITYTYPES.CONE
  , comp:EntityCone
  , compRef:EntityConeRef
  , isTransform:true
  , shape:"BOX"
  , mass:1
  , parameters:[
    {
      radius:1
      , height : 1
      , radialSegments: 8
    },
    {
      radius:1
      , height : 1
      , radialSegments: 8
      , heightSegments : 1
      , openEnded: false
      , thetaStart: 0
      , thetaLength: 2*Math.PI
    }
  ],
  material:[{
      index:0
    , objectid:nanoid32()
    , dataType:"meshStandardMaterial"
    , name:"meshStandardMaterial"
    , color:"#ffffff"
    , wireframe:false
  }]
})
AddCompObjEntity({
  name:"cylinder"
  , dataType:API.ENTITYTYPES.CYLINDER
  , comp:EntityCylinder
  , compRef:EntityCylinderRef
  , isTransform:true
  , shape:"CYLINDER"
  , mass:1
  , parameters:[
    {
      radiusTop :1
      , radiusBottom  : 1
      , height : 1
      , radialSegments  : 8
    },
    {
      radiusTop :1
      , radiusBottom  : 1
      , height : 1
      , radialSegments  : 8
      , heightSegments   : 1
      , openEnded   : false
      , thetaStart    : 0
      , thetaLength     : 2*Math.PI
    }
  ],
  material:[{
      index:0
    , objectid:nanoid32()
    , dataType:"meshStandardMaterial"
    , name:"meshStandardMaterial"
    , color:"#ffffff"
    , wireframe:false
  }]
})
AddCompObjEntity({
  name:"plane"
  , isTransform:true
  , dataType:API.ENTITYTYPES.PLANE
  , comp:EntityPlane
  , compRef:EntityPlaneRef
  , shape:"PLANE"
  , mass:0
  , parameters:[
    {
        width:1
      , height: 1 
    },
    {
        width: 1
      , height: 1 
      , widthSegments: 1 
      , heightSegments: 1 
    }
  ],
    material:[{
      index:0
    , objectid:nanoid32()
    , dataType:"meshStandardMaterial"
    , name:"meshStandardMaterial"
    , color:"#ffffff"
    , wireframe:false
  }]
})
AddCompObjEntity({
  name:"sphere"
  , dataType:API.ENTITYTYPES.SPHERE
  , comp:EntitySphere
  , compRef:EntitySphereRef
  , isTransform:true
  , shape:"SPHERE"
  , mass:1
  , parameters:[
    {
        radius:1
      , widthSegments:32
      , heightSegments:16
    },
    {
      radius:1
      ,widthSegments:32
      ,heightSegments:16
      ,phiStart :0
      ,phiLength :Math.PI * 2
      ,thetaStart :0
      ,thetaLength :Math.PI
    }
  ],
  material:[{
      index:0
    , objectid:nanoid32()
    , dataType:"meshStandardMaterial"
    , name:"meshStandardMaterial"
    , color:"#ffffff"
    , wireframe:false
  }]
})

AddCompObjEntity({
  name:"axesHelper"
  , dataType:API.ENTITYTYPES.AXESHELPER
  , comp:EntityAxesHelper
  , compRef:EntityAxesHelperRef
  , shape:null
  , isTransform:true
  , parameters:[
    {
      size:1
    }
  ]
})

AddCompObjEntity({
  name:"gridHelper"
  , dataType:API.ENTITYTYPES.GRIDHELPER
  , comp:EntityGridHelper
  , compRef:EntityGridHelperRef
  , shape:null
  , isTransform:true
  , parameters:[
    {
      size:10
    , divisions:10
  },
  {
    size:10
  , divisions:10
  , colorCenterLine:"#444444"
  , colorGrid :"#888888"
  }
  ]
})


AddCompObjEntity({
  name:"ambientlight"
  , dataType:API.ENTITYTYPES.AMBIENTLIGHT
  , comp:EntityAmbientLight
  , compRef:EntityAmbientLightRef
  , shape:null
  , isTransform:false
  , parameters:[
    {
      color:0x404040
      , intensity:1
    }
  ]
})
AddCompObjEntity({
  name:"pointlight"
  , dataType:API.ENTITYTYPES.POINTLIGHT
  , comp:EntityPointLight
  , compRef:EntityPointLightRef
  , isTransform:true
  , shape:"BOX"
  , mass:1
  , parameters:[
    {
      color:"#FFFFFF"
    , intensity:1
    , distance:1000
    , decay:1
    }
  ]
})
AddCompObjEntity({
  name:"perspectivecamera"
  , dataType:API.ENTITYTYPES.PERSPECTIVECAMERA
  , comp:EntityPerspectiveCamera
  , compRef:EntityPerspectiveCameraRef
  , isTransform:true
  , shape:"BOX"
  , mass:1
  , parameters:[
    {
        fov:45
      , aspect:0.8823
      , near:1
      , far:100
    }
  ]
})
AddCompObjEntity({
  name:"orthographiccamera"
  , dataType:API.ENTITYTYPES.ORTHOGRAPHICCAMERA
  , comp:EntityOrthographicCamera
  , compRef:EntityOrthographicCameraRef
  , isTransform:true
  , shape:"BOX"
  , mass:1
  , parameters:[{
      far:2000
    , near:0.1
    , zoom:1
  }]
})
AddCompObjEntity({
  name:"color"
  , dataType:API.ENTITYTYPES.COLOR
  , comp:EntityColor
  , compRef:EntityColorRef
  , isTransform:false
  , shape:null
  , parameters:[{
      color:"#000000"
  }]
})

AddCompObjEntity({
  name:"arrowHelper"
  , dataType:API.ENTITYTYPES.ARROWHELPER
  , comp:EntityArrowHelper
  , compRef:EntityArrowHelperRef
  , isTransform:true
  , shape:null
  , parameters:[{
      dir:[0,0,1]
    , origin:[0,0,0]
    , length :1
    , hex: "#ffff00"
  },{
    dir:[1,0,1]
  , origin: [0,0,0]
  , length :1
  , hex: "#ffff00"
  , headLength: 0.2 * 1
  , headWidth: 0.2 * 1
  }]
})

AddCompObjEntity({
  name:"modelfbx"
  , dataType:API.ENTITYTYPES.MODELFBX
  , comp:EntityModalFBX
  , compRef:EntityModalFBXRef
  , isTransform:true
  , shape:"BOX"
  , mass:0
  , parameters:[{
      url:"/box.fbx"
  }]
})

AddCompObjEntity({
  name:"modelobj"
  , dataType:API.ENTITYTYPES.MODELOBJ
  , comp:EntityModalOBJ
  , compRef:EntityModalOBJRef
  , isTransform:true
  , shape:"BOX"
  , mass:0
  , parameters:[{
      url:"/box.obj"
  }]
})

AddCompObjEntity({
  name:"modelgltf"
  , dataType:API.ENTITYTYPES.MODELGLTF
  , comp:EntityModalGLTF
  , compRef:EntityModalGLTFRef
  , isTransform:true
  , shape:"BOX"
  , mass:0
  , parameters:[{
      url:"/box.gltf"
  }]
})
loaded=true
global.ENTITIES=ENTITIES;
}

//AddCompObjEntity()

export {
  ENTITIES
}

export function getEntities(){
  return ENTITIES;
}

export function AddCompObjEntity(args){
  //console.log(args)
  let item = ENTITIES.find(item=>item.name==args.name)
  //console.log(ENTITIES);
  //console.log(item);
  if(!item){
    ENTITIES.push(args)
  }
}

export function AddCompEntity(name,datatype,comp,compref){
  ENTITIES.push({
    name:name
    , dataType:datatype
    , comp:comp
    , compRef:compref
  })
}