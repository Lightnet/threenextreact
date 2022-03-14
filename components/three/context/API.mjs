/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This is array and not react as it need server and client to read data for api request and response.

*/

import { nanoid32 } from "../../../lib/helper.mjs";

//import EntityAmbientLight, { EntityAmbientLightRef } from "../entity/EntityAmbientLight.jsx";

// https://threejs.org/docs/?q=scene#api/en/scenes/Scene

 const API = {
    EVENT:"EVENT"
  , FAIL:"FAIL"
  , DELETE:"DELETE"
  , UPDATE:"UPDATE"
  , DEFAULT:"DEFAULT"
  , PUT:"PUT"
  , ADD:"ADD"
  , CREATE:"CREATE"
  , REMOVE:"REMOVE"
  , EDIT:"EDIT"
  , SCENE:"SCENE"
  , SCENES:"SCENES"
  , PROJECT:"PROJECT"
  , PROJECTS:"PROJECTS"
  , ENTITY:"ENTITY"

  ,MESSAGE:"MESSAGE"
  ,MESSAGETYPES:{
      FAIL:"FAIL"
    , TRY:"TRY"
    , ERROR:"ERROR"
  },
  SHAPETYPES:{
      BOX:"BOX"
    , SPHERE:"SPHERE"
    , PLANE:"PLANE"
    , CYLINDER:"CYLINDER"
  },
  ENTITYTYPES:{
      OBJECT3D:"OBJECT3D"
    , SCENE:"SCENE"
    , BOX:"BOX"
    , SPHERE:"SPHERE"
    , PLANE:"PLANE"
    , CIRCLE:"CIRCLE"
    , CONE:"CONE"
    , CYLINDER:"CYLINDER"
    , GROUP:"GROUP"
    , LIGHT:"LIGHT"
    , POINTLIGHT:"POINTLIGHT"
    , AMBIENTLIGHT:"AMBIENTLIGHT"
    , CAMERA:"CAMERA"
    , PERSPECTIVECAMERA:"PERSPECTIVECAMERA"
    , ORTHOGRAPHICCAMERA:"ORTHOGRAPHICCAMERA"
    , ORBITCONTROLS:"ORBITCONTROLS"
    , COLOR:"COLOR"
  },

  //deal with easy and miss spelling
  VIEWS:{
      SCENE:"Scene"
    , SCENES:"Scenes"
    , CREATEENTITYOBJECT:"Create Entity Object"
    , ENTITYSCENEOBJECTS:"Entity Scene Objects"
    , ENTITYSELECTOBJECT:"Entity Select Object"
  },

  ENTITIES:[
    {
      name:"scene"
    , isTransform:true
    , dataType:"SCENE"
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
    },

    {
      name:"group"
    , isTransform:true
    , dataType:"GROUP"
    , shape:"BOX"
    , mass:1
    , parameters:[]
    },

    {
        name:"box"
      , isTransform:true
      , dataType:"BOX"
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
    },

    {
      name:"circle"
    , isTransform:true
    , dataType:"CIRCLE"
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
    },

    {
      name:"cone"
    , isTransform:true
    , dataType:"CONE"
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
    },

    {
      name:"cylinder"
    , isTransform:true
    , dataType:"CYLINDER"
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

    },

    {
      name:"plane"
    , isTransform:true
    , dataType:"PLANE"
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
    },
    
    {
      name:"sphere"
    , isTransform:true
    , dataType:"SPHERE"
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
    },

    {
      name:"ambientlight"
    , isTransform:false
    , dataType:"AMBIENTLIGHT"
    , shape:"BOX"
    , mass:1
    , parameters:[
        {
          color:0x404040
          , intensity:1
        }
      ],
    },
    

    {
      name:"pointlight"
    , isTransform:true
    , dataType:"POINTLIGHT"
    , shape:"BOX"
    , mass:1
    , parameters:[
        {
          color:"#FFFFFF"
        , intensity:1
        , distance:1000
        , decay:1
        }
      ],
    },

    {
      name:"perspectivecamera"
    , isTransform:true
    , dataType:"PERSPECTIVECAMERA"
    , shape:"BOX"
    , mass:1
    , parameters:[
        {
            fov:45
          , aspect:0.8823
          , near:1
          , far:100
        }
      ],
    },

    {
      name:"orthographiccamera"
    , isTransform:true
    , dataType:"ORTHOGRAPHICCAMERA"
    , shape:"BOX"
    , mass:1
    , parameters:[{
          far:2000
        , near:0.1
        , zoom:1
      }],
    },

    {
      name:"color"
    , isTransform:false
    , dataType:"COLOR"
    , shape:null
    , parameters:[{
          color:"#000000"
      }],
    }

  ]
}

export default API;
