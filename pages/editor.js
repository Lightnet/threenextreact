/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';

import ComponentEditor from "../components/componenteditormain";

import EditorTopSideBar from "../components/componenttopsidebareditor";
import EditorRightSideBar from "../components/componentrightsidebareditor";

export async function getServerSideProps(ctx) {
  return {
    props:{
      session: await getSession(ctx),
    }
  }
}


function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  //console.log("Box");
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

function Foo(props){
  const ref = useRef();
  //console.log("Foo");

  return (
    <mesh
      {...props}
      ref={ref}
      >
    </mesh>
    )
}

export default function Page({
  session
}){

  const [editorTSB, seteditorTSB] = useState(true);
  const [editorRSB, seteditorRSB] = useState(true);

  useEffect(async () => {
    console.log("INIT SET MOUNT!");

    return ()=>{
      console.log('clean up');
    };
  }, []);

  function ToggleTopSB(){
    console.log("seteditorTSB");
    if(editorTSB){
      seteditorTSB(false);
    }else{
      seteditorTSB(true);
    }
  }

  function ToggleRightSB(){
    console.log("seteditorTSB");
    if(editorRSB){
      seteditorRSB(false);
    }else{
      seteditorRSB(true);
    }
  }

  return(<>
    
    <Canvas>
      <Foo />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
    
    <EditorTopSideBar
      isOpen={editorTSB}
      onRequestClose={ToggleTopSB}
    ></EditorTopSideBar>

    <EditorRightSideBar
      isOpen={editorRSB}
      onRequestClose={ToggleRightSB}
    ></EditorRightSideBar>
    <div className="btn">
    <button  onClick={ToggleTopSB}>Top Side Bar</button>
    <button  onClick={ToggleRightSB}>Right Side Bar</button>
    </div>
    
  </>);
}

/*

 
 */
