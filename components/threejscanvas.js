/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
// https://docs.pmnd.rs/react-three-fiber/API/hooks
// https://discourse.threejs.org/t/react-x-three-js-resizing-is-not-working/13678

var addone=false;

function Foo(props){
  const [ blisten, setListen ] = useState(false);  
  const state = useThree();
  const set = useThree((state) => state.set);
  const ref = useRef();
  //var baddlisten=false;
  //console.log(state);
  //console.log("hello world");
  const camera = useThree((state) => state.camera);
  //console.log(camera);
  //const viewport = useThree((state) => state.viewport)
  //const size = useThree((state) => state.size);
  //console.log(window.innerWidth);
  //let width=window.innerWidth;
  //let height=window.innerHeight;
  //console.log(blisten);
  //if(blisten==false){
    //setListen(true);
    //console.log(blisten);
  //}

  function onWindowResize(){
    //if(baddlisten==false){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    set({ size:{
      width:window.innerWidth,
      height:window.innerHeight
    }});
    //renderer.setSize( window.innerWidth, window.innerHeight );
    //size.width=window.innerWidth;
    //size.height=window.innerHeight;
    //baddlisten=true;
  }
  //}
  //onWindowResize();
  if(addone==false){
    console.log("ADDED?");
    //window.addEventListener( 'resize', onWindowResize, false );
    addone=true;
    //baddlisten=true;
  }

  return null;
  /*
  return (<mesh
    {...props}
    ref={ref}
    >

  </mesh>)
  */
}

//function resizethreejs(){
  //console.log("test");
  //let state = useThree();
  //console.log(state);
//}
// https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md
export default function Component() {

  useEffect(async () => {
    console.log("INIT SET MOUNT!");
    //const state = useThree();
    //const set = useThree((state) => state.set)

    //window.addEventListener( 'resize', resizethreejs, false );

    window.addEventListener('resize', () =>{
      //render(null, document.querySelector('canvas'), {
        //events,
        //size: { width: window.innerWidth, height: window.innerHeight },
      //})

      //render(<mesh />, document.querySelector('canvas'), {
        //events,
        //size: { width: window.innerWidth, height: window.innerHeight },
      //})
      //const state = useThree();
      //const set = useThree((state) => state.set);
      //const camera = useThree((state) => state.camera);

      //camera.aspect = window.innerWidth / window.innerHeight;
      //camera.updateProjectionMatrix();
      //set({ size:{
        //width:window.innerWidth,
        //height:window.innerHeight
      //}});
    })

    window.dispatchEvent(new Event('resize'));

  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted


  // Canvas > [DEPRECATED] Please use `subscribeWithSelector` middleware
  return (<>
    <Canvas style={{position: 'relative', display:'flex',  width:"100%", height: "100%",overflow:'hidden' }}>
      <Foo />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  </>);
}
/*


      

*/
