/*
  LICENSE: MIT
  Created by: Lightnet
*/

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
    , ORBITCONTROLS:"ORBITCONTROLS"
  },

  ENTITIES:[
    {
      name:"scene"
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
        name:"box"
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
      ]
    },

    {
      name:"circle"
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
    ]
    },

    {
      name:"cone"
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
    ]
    },

    {
      name:"cylinder"
    , dataType:"CYLINDER"
    , shape:"BOX"
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
    ]
    },

    {
      name:"plane"
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
    ]
    },
    
    {
      name:"sphere"
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
      ]
    },

    {
      name:"ambientlight"
    , dataType:"AMBIENTLIGHT"
    , shape:"BOX"
    , mass:1
    , parameters:[
        {
          color:0x404040
          , intensity:1
        }
      ]
    },

    {
      name:"pointlight"
    , dataType:"POINTLIGHT"
    , shape:"BOX"
    , mass:1
    , parameters:[
        {
          color:0xff0000
        , intensity:1
        , distance:1000
        , decay:1
        }
      ]
    },
    {
      name:"perspectivecamera"
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
      ]
    }

  ]
}

export default API;
