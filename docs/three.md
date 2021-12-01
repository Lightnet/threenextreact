https://github.com/pmndrs/drei
- camera
- PerspectiveCamera  
- OrbitControls
- others


https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html
https://threejs.org/docs/#api/en/geometries/CircleGeometry
https://docs.pmnd.rs/react-three-fiber/API/objects
https://threejs.org/docs/index.html?q=light#api/en/helpers/PointLightHelper


https://github.com/pmndrs/react-three-fiber
https://www.npmjs.com/package/@react-three/fiber
https://github.com/pmndrs/use-cannon
https://blog.logrocket.com/3d-rendering-in-the-browser-with-react-three-fiber/
https://gracious-keller-98ef35.netlify.app/docs/api/canvas/
https://codesandbox.io/s/musing-kare-4fblz
https://codesandbox.io/examples/package/react-use-measure
https://github.com/pmndrs/react-three-fiber/issues/1394
```js
function Scale({ width, height }) {
  const state = useThree()
  const [setSize] = useState(() => state.setSize)
  useLayoutEffect(() => {
    setSize(width, height)
    state.set({ setSize: () => null })
    return () => state.set({ setSize })
  }, [setSize, width, height])
  return null
}
```
https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance
https://stackoverflow.com/questions/68796567/react-three-fiber-lock-object-position-in-canvas
https://stackoverflow.com/questions/63691965/how-to-know-all-attributes-of-canvas-in-react-three-fiber?rq=1
https://github.com/pmndrs/react-three-fiber

https://threejs.org/docs/#api/en/core/Object3D.visible



https://examples.bradwoods.io/react-three-fiber/material-wireframe