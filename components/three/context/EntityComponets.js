/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    set up component and object types.

  Note that react is client only. If put on Server side will error.

*/

import EntityAmbientLight, { EntityAmbientLightRef } from "../entity/EntityAmbientLight";
import EntityBox, { EntityBoxRef } from "../entity/EntityBox";
import EntityCircle, { EntityCircleRef } from "../entity/EntityCircle";
import EntityCone, { EntityConeRef } from "../entity/EntityCone";
import EntityGroup, { EntityGroupRef } from "../entity/EntityGroup";
import EntityPlane, { EntityPlaneRef } from "../entity/EntityPlane";
import EntityPointLight, { EntityPointLightRef } from "../entity/EntityPointLight";
import EntityScene, { EntitySceneRef } from "../entity/EntityScene";
import EntitySphere, { EntitySphereRef } from "../entity/EntitySphere";
import API from "./API.mjs";

var ENTITIES=[
  {
    name:"box"
    , dataType:API.ENTITYTYPES.BOX
    , comp:EntityBox
    , compRef:EntityBoxRef
  },
  {
    name:"plane"
    , dataType:API.ENTITYTYPES.PLANE
    , comp:EntityPlane
    , compRef:EntityPlaneRef
  },
  {
    name:"circle"
    , dataType:API.ENTITYTYPES.CIRCLE
    , comp:EntityCircle
    , compRef:EntityCircleRef
  },
  {
    name:"cone"
    , dataType:API.ENTITYTYPES.CONE
    , comp:EntityCone
    , compRef:EntityConeRef
  },
  {
    name:"sphere"
    , dataType:API.ENTITYTYPES.SPHERE
    , comp:EntitySphere
    , compRef:EntitySphereRef
  },
  {
    name:"group"
    , dataType:API.ENTITYTYPES.GROUP
    , comp:EntityGroup
    , compRef:EntityGroupRef
  },
  {
    name:"pointlight"
    , dataType:API.ENTITYTYPES.POINTLIGHT
    , comp:EntityPointLight
    , compRef:EntityPointLightRef
  },
  {
    name:"ambientlight"
    , dataType:API.ENTITYTYPES.AMBIENTLIGHT
    , comp:EntityAmbientLight
    , compRef:EntityAmbientLightRef
  },
  {
    name:"scene"
    , dataType:API.ENTITYTYPES.SCENE
    , comp:EntityScene
    , compRef:EntitySceneRef
  }
]

export default {
  ENTITIES:ENTITIES
}