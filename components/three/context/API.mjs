/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This is array and not react as it need server and client to read data for api request and response.

*/

//import { nanoid32 } from "../../../lib/helper.mjs";
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
    , CAPSULE:"CAPSULE"
    , SPHERE:"SPHERE"
    , PLANE:"PLANE"
    , CIRCLE:"CIRCLE"
    , CONE:"CONE"
    , CYLINDER:"CYLINDER"
    , DODECAHEDRON:"DODECAHEDRON"
    , ICOSAHEDRON:"ICOSAHEDRON"
    , OCTAHEDRON:"OCTAHEDRON"
    , RING:"RING"
    , TETERAHEDRON:"TETERAHEDRON"
    , TORUS:"TORUS"
    , TORUSKNOT:"TORUSKNOT"
    , GROUP:"GROUP"
    , LIGHT:"LIGHT"
    , POINTLIGHT:"POINTLIGHT"
    , AMBIENTLIGHT:"AMBIENTLIGHT"
    , CAMERA:"CAMERA"
    , PERSPECTIVECAMERA:"PERSPECTIVECAMERA"
    , ORTHOGRAPHICCAMERA:"ORTHOGRAPHICCAMERA"
    , ORBITCONTROLS:"ORBITCONTROLS"
    , COLOR:"COLOR"
    , AXESHELPER:"AXESHELPER"
    , GRIDHELPER:"GRIDHELPER"
    , ARROWHELPER:"ARROWHELPER"
    , MODELFBX:"MODELFBX"
    , MODELGLTF:"MODELGLTF"
    , MODELOBJ:"MODELOBJ"
  },

  //deal with easy and miss spelling
  VIEWS:{
      SCENE:"Scene"
    , SCENES:"Scenes"
    , CREATEENTITYOBJECT:"Create Entity Object"
    , ENTITYSCENEOBJECTS:"Entity Scene Objects"
    , ENTITYSELECTOBJECT:"Entity Select Object"
  }
}

export default API;