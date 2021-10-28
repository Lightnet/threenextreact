/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';

//import ComponentEditor from "../components/componenteditormain";

import EditorTopSideBar from "../components/componenttopsidebareditor";
import EditorRightSideBar from "../components/componentrightsidebareditor";

import EditorScene from "../components/componenteditorscene";
import EditorProps from "../components/componenteditorprops";

import { v4 as uuidv4 } from 'uuid';

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

function Cube(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (ref.current.rotation.x += 0.01))

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

  const [objList, setObjList] = useState([]); //json raw
  const [objects3D, setObjects3D] = useState([]); //scene object

  const [selectObject, setSelectObject] = useState(null); //json raw

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

  function updateObjects(){
    let obj = objList;
    let objmap = obj.map((_entity)=>{
      return buildModel(_entity)
    })
    console.log(objmap);
    setObjects3D(objmap);
  }

  function buildModel(item){
    if(item.type=="cube"){
      console.log("FOUND CUBE");
      return(<Cube
        key={item.id}
        position={[0, 0, 0]}
      >
      </Cube>)
    }else{
      return(<Cube
        position={[0, 0, 0]}
      >
      </Cube>)
    }
  }

  function btnAction(event,param){
    console.log(event);
    console.log(param);
    if(param){
      if(param.action){
        if(param.action=="addcube"){
          let obj = objList;
          obj.push({
            id: uuidv4()
            , name:"cube"+uuidv4()
            , type:"cube"
            , position:[0,0,0]
            , rotation:[0,0,0]
            , scale:[1,1,1]
          });
          setObjList(obj);
          updateObjects();
        }

        if(param.action=="select"){
          for(let i =0;i<objList.length;i++){
            if(objList[i].id == param.id){
              setSelectObject(objList[i]);
              break;
            }
          }
        }
      }
    }
  }

  return(<>
    
    <Canvas>
      <Foo />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[1.2, 0, 0]} />
      {objects3D}
    </Canvas>
    
    <EditorTopSideBar
      isOpen={editorTSB}
      onRequestClose={ToggleTopSB}
    >
      <a href="#" onClick={(e)=>btnAction(e,{action:"addscene"})}>Add Scene</a>
      <a href="#" onClick={(e)=>btnAction(e,{action:"addcube"})}>Add Cube</a>
      <a href="#" onClick={(e)=>btnAction(e,{action:"addsphere"})}>Add Sphere</a>
      <a href="#" onClick={(e)=>btnAction(e,{action:"addplane"})}>Add Plane</a>
      <a href="#" onClick={(e)=>btnAction(e,{action:"addcamera"})}>Add Camera</a>
      <a href="#" onClick={(e)=>btnAction(e,{action:"addlight"})}>Add Light</a>

    </EditorTopSideBar>

    <EditorRightSideBar
      isOpen={editorRSB}
      onRequestClose={ToggleRightSB}
    >
      <EditorScene
        ops={btnAction}
        scene={objList}
        ></EditorScene>
      <EditorProps
        selectObject={selectObject}
      ></EditorProps>

    </EditorRightSideBar>
    <div className="btn">
    <button  onClick={ToggleTopSB}>Top Side Bar</button>
    <button  onClick={ToggleRightSB}>Right Side Bar</button>
    </div>
    
  </>);
}

/*

 
 */
