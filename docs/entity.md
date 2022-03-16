### Entity and object3D:
  To handle the object in form of Entity prefixed as it to have modular design. Since the name is take from the react three fiber.

  The idea base on the graph save database with json file format.

  Work in progress and design may change.
```js
var entityObject3D1={
    objectid:"012345678901234567890012"
  , datatype:"object3d"
  , name:"1"
  , position:[0,0,0]
  , rotation:[0,0,0]
  , scale:[0,0,0]
}

var entityObject3D2={
    objectid:"012345678901234567890012"
  , datatype:"object3d"
  , name:"2"
  , position:[0,0,0]
  , rotation:[0,0,0]
  , scale:[0,0,0]
  , physics:{
    isPhysics:false
    , shapetype:"box"
    , mass:0
  }
}
```
  Note some code might conflict with the props base on passing with the variable like the position. This could be used as component add to the entity like material. 

```js
var entityObject3D2={
    objectid:"012345678901234567890012"
  , datatype:"object3d"
  , name:"2"
  , position:[0,0,0]
  , rotation:[0,0,0]
  , scale:[0,0,0]
  , physics:{
    isPhysics:false
    , shapetype:"box"
    , mass:0
  },
  material:{
    idx:0
    , name:""
  }
}
```

```js
export default function EntityObjectRender(props){
//...
  <EntityBox position={props.position} //this set up
   />
//...
<EntityBox {...props} /> // pass that match varaibles
//...
```
  There are two methods to pass position.