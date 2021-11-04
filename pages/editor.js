/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'

//import ComponentEditor from "../components/componenteditormain";

import EditorTopSideBar from "../components/editor/editorsidebartop";
import EditorRightSideBar from "../components/editor/editorsidebarright";

import EditorScene from "../components/editor/editorscene";
import EditorProps from "../components/editor/editorprops";

import DropDownMenu from "../components/ui/edropdown";

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

  console.log("ref.current.position")
  if(ref.current){
    console.log(ref.current.position)
  }
  

  //useFrame((state, delta) => (ref.current.rotation.x += 0.01))

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

function CameraTest(props){
  const ref = useRef();


  return (
    <PerspectiveCamera
      makeDefault // Registers it as the default camera system-wide (default=false)
      {...props}
      ref={ref}
      >
    </PerspectiveCamera>
    )
}

function CameraCtrl(props){
  const ref = useRef();


  return (
    <>
      <PerspectiveCamera
        makeDefault // Registers it as the default camera system-wide (default=false)
        {...props}
        ref={ref}
        position={[0, 5, 5]} 
        >
      </PerspectiveCamera>
      <OrbitControls camera={ref.current} />
    </>
    )
}



export default function Page({
  session
}){

  const [editorTSB, seteditorTSB] = useState(true);
  const [editorRSB, seteditorRSB] = useState(true);

  const [selectObject, setSelectObject] = useState(null); //select object for props div

  const [sceneObjs, setSceneObjs] = useState([]); //json
  const [objects3D, setObjects3D] = useState([]); //scene objects
  const [physics3D, setPhysics3D] = useState([]); //physic objects

  //const sceneObjsRef = useRef([]);
  //const ref = useRef();//get this current element react componet

  useEffect(async () => {
    console.log("INIT SET MOUNT!");
    return ()=>{
      console.log('clean up');
    };
  }, []);

  //side bar
  function ToggleTopSB(){
    console.log("seteditorTSB");
    if(editorTSB){
      seteditorTSB(false);
    }else{
      seteditorTSB(true);
    }
  }

  //side bar
  function ToggleRightSB(){
    console.log("seteditorTSB");
    if(editorRSB){
      seteditorRSB(false);
    }else{
      seteditorRSB(true);
    }
  }

  //update model for render {objects3D}
  function updateObjects(){
    //let obj = sceneObjsRef.current;
    let obj = sceneObjs;
    let objmap = obj.map((_entity)=>{
      return buildModel(_entity)
    })
    console.log(objmap);
    setObjects3D(objmap);
  }

  //build model by type
  function buildModel(item){
    if(item.type=="cube"){
      console.log("FOUND CUBE");
      return(<Cube
        key={item.id}
        visible={item.visible }
        
        //position={[0, 0, 0]}
        position={[item.position[0],item.position[1],item.position[2]]}
        rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
      >
      </Cube>)
    }else{
      return(<Cube
        position={[0, 0, 0]}
      >
      </Cube>)
    }
  }

  //call from the child component events
  function btnAction(event,param){
    console.log(event);
    console.log(param);
    if(param){
      if(param.action){
        if(param.action=="addcube"){
          //let objs = sceneObjsRef.current;
          let objs = sceneObjs;
          objs.push(
            {
              id: uuidv4()
              , name:"cube"+uuidv4()
              , type:"cube"
              , visible: true
              , position:[0,0,0]
              , rotation:[0,0,0]
              , scale:[1,1,1]
            });
          setSceneObjs(objs)
          
          //setSceneObjs(obj);
          updateObjects();
        }

        if(param.action=="select"){
          for(let i =0;i<sceneObjs.length;i++){
            if(sceneObjs[i].id == param.id){
              setSelectObject(sceneObjs[i]);
              break;
            }
          }
        }

        if(param.action=="visible"){
          console.log(param.name);
          //let objs = sceneObjsRef.current;
          let objs = sceneObjs;
          for(let i =0;i<objs.length;i++){
            if(objs[i].id == param.id){
              //objs[i].name = param.name;
              if(objs[i].visible){
                objs[i].visible=false;
              }else{
                objs[i].visible=true;
              }
              setSceneObjs(objs);
              updateObjects();
              break;
            }
          }
        }

        if(param.action=="rename"){
          console.log(param.name);
          console.log(param.position[0]);
          //let objs = sceneObjsRef.current;
          let objs = sceneObjs;
          for(let i =0;i<objs.length;i++){
            if(objs[i].id == param.id){
              objs[i].name = param.name;
              setSceneObjs(objs);
              console.log("update rename object?");
              //update new render...
              updateObjects();
              break;
            }
          }
        }

        if(param.action=="update"){
          console.log("update???======================================");
          console.log(param);
          //let objs = sceneObjsRef.current;
          let objs = sceneObjs;
          for(let i =0;i<objs.length;i++){
            if(objs[i].id == param.id){
              console.log("FOUND.................................")
              //objs[i].name = param.name;
              if(param.key == "positionX"){
                objs[i].position[0] = param.setValue;
              }
              if(param.key == "positionY"){
                objs[i].position[1] = param.setValue;
              }
              if(param.key == "positionZ"){
                objs[i].position[2] = param.setValue;
              }

              if(param.key == "rotationX"){
                objs[i].rotation[0] = param.setValue;
              }
              if(param.key == "rotationY"){
                objs[i].rotation[1] = param.setValue;
              }
              if(param.key == "rotationZ"){
                objs[i].rotation[2] = param.setValue;
              }
              
              //update objs
              setSceneObjs(objs);
              console.log("UPDATE SELECT OBJECT>>>>>>>>>>>>>>>>>>>")
              //update select object
              setSelectObject(objs[i]);
              //update objs new render
              updateObjects();
              break;
            }
          }
        }


      }
    }
  }

  function Non(){

  }

  return(<>
    
    <Canvas>
      <Foo />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[1.2, 0, 0]} />
      {/**/}
      {objects3D}

      <CameraCtrl />




    </Canvas>
    
    <EditorTopSideBar
      isOpen={editorTSB}
      onRequestClose={ToggleTopSB}
    >
      <DropDownMenu menuname="test" >
        <a href="#" >Select Object</a>
      </DropDownMenu>

      <DropDownMenu menuname="File" >
        <a href="#" >Project List</a>
        <a href="#" >Settings</a>
        <a href="#" >Config</a>
      </DropDownMenu>

      <DropDownMenu menuname="Tools" >
        <a href="#" >Server</a>
        <a href="#" >Network</a>
        <a href="#" >Client</a>
      </DropDownMenu>

      <DropDownMenu menuname="View" >
        <a href="#" >Assets</a>
        <a href="#" >Material</a>
        <a href="#" >Texture</a>
        <a href="#" >Model</a>
        <a href="#" >Scene</a>
        <a href="#" >Props</a>
        <a href="#" >Script</a>
        <a href="#" >Blueprint</a>
        <a href="#" >Prefab</a>
      </DropDownMenu>

      <DropDownMenu menuname="Scene" >
        <a href="#" onClick={(e)=>btnAction(e,{action:"addscene"})}>Add Scene</a>
        <a href="#" onClick={(e)=>btnAction(e,{action:"addcube"})}>Add Cube</a>
        <a href="#" onClick={(e)=>btnAction(e,{action:"addsphere"})}>Add Sphere</a>
        <a href="#" onClick={(e)=>btnAction(e,{action:"addplane"})}>Add Plane</a>
        <a href="#" onClick={(e)=>btnAction(e,{action:"addcamera"})}>Add Camera</a>
        <a href="#" onClick={(e)=>btnAction(e,{action:"addlight"})}>Add Light</a>
      </DropDownMenu>

      <DropDownMenu menuname="Prefab" >
        <a href="#" >User Custom</a>
      </DropDownMenu>

      <DropDownMenu menuname="Build" >
        <a href="#" >Play</a>
        <a href="#" >Debug Play</a>
        <a href="#" >Publish</a>
      </DropDownMenu>

      <DropDownMenu menuname="Help" >
        <a href="#" >About</a>
        <a href="#" >Docs</a>
        <a href="#" >Github</a>
        <a href="#" >Plugins</a>
      </DropDownMenu>
      
    </EditorTopSideBar>

    <EditorRightSideBar
      isOpen={editorRSB}
      onRequestClose={ToggleRightSB}
    >
      
      <EditorScene
        ops={btnAction}
        sceneObjs={sceneObjs}
        ></EditorScene>
      {/* */}
      <EditorProps
        selectObject={selectObject}
        ops={btnAction}
      ></EditorProps>
         
    </EditorRightSideBar>

    
    <div className="btn">
      <label>Side Bars:</label>
      <button  onClick={ToggleTopSB}>Top</button>
      <button  onClick={ToggleRightSB}>Right</button>
      <button  onClick={ToggleRightSB}>Bottom</button>
      <button  onClick={ToggleRightSB}>Left</button>
    </div>
    
  </>);
}

/*

 
 */
