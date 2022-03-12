

 

# class :
- AxesHelper 
- AxisHelper 
- BoxHelper 
- BoundingBoxHelper
- EdgesHelper
- GridHelper
- SkeletonHelper
- WireframeHelper
- ArrowHelper
- Box3Helper
- CameraHelper
- DirectionalLightHelper
- HemisphereLightHelper
- PlaneHelper
- PointLightHelper
- PolarGridHelper
- SpotLightHelper
- 
- GizmoHelper
- GizmoViewport
- 
- 

- https://drei.pmnd.rs/?path=/story/misc-usehelper--default-story
- useHelper




https://github.com/pmndrs/use-cannon/blob/master/packages/react-three-cannon-examples/src/demos/demo-Triggers.tsx

-BoxTrigger
```js
const [ref] = useBox(() => ({ args, isTrigger: true, onCollide, position }))

onCollide={(e) => {
  console.log('Collision event on BoxTrigger', e)
  setbg('#fe4365')
}}
```






