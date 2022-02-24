/*
  LICENSE: MIT
  Created by: Lightnet
*/

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
  }

  , BOX:{
      parm0:{}
    , parm1:{}
  }
  ,SCENE:{
    param0:{
        autoUpdate:true
      , background:null
      , environment:null
      , fog:null
      , overrideMaterial:null
    }
  }
}

export default API;
