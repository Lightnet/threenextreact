/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

// THREE
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'

// UI
//import ComponentEditor from "../components/componenteditormain";
import EditorTopSideBar from "./sidebartop";
import EditorRightSideBar from "./sidebarright";
import DropDownMenu from "../../ui/edropdown";

// PANEL
import EditorScene from "./objectscene";
import EditorProps from "./objectprops";

//import { v4 as uuidv4 } from 'uuid';
import { nanoid32 } from "../../../lib/helper";


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
      //scale={active ? 1.5 : 1}
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

export default function EditorSection({editorid}){

  const [editorTSB, seteditorTSB] = useState(true);
  const [editorRSB, seteditorRSB] = useState(true);

  const [selectObject, setSelectObject] = useState(null); //select object for props div

  const [sceneObjs, setSceneObjs] = useState([]); // scene objects array json
  const [objects3D, setObjects3D] = useState([]); // scene objects render react
  const [physics3D, setPhysics3D] = useState([]); //physic objects

  const [editorID, setEditorID] = useState(null);
  const [sceneID, setSceneID] = useState(null);

  //const sceneObjsRef = useRef([]);
  //const ref = useRef();//get this current element react component

  useEffect(() => {
    //console.log("INIT SET MOUNT!");
    if(editorid){
      console.log("EDITOR ID FOUND")
      setEditorID(editorid);
    }else{
      console.log("NOT FOUND")
    }

    initEditorDefaultScene()
    return ()=>{
      console.log('EDITOR CLEAN UP!');
    };
  }, [editorid,editorID]);

  useEffect(()=>{
    if(sceneID){
      loadSceneObjects();
    }
  },[sceneID]);

  useEffect(()=>{
    if(sceneObjs){
      updateObjects();//update scene object3ds
    }
  },[sceneObjs]);

  async function initEditorDefaultScene(){
    console.log("INIT... EDITOR ID:", editorID);
    if(!editorID){
      return;
    }
    let res = await fetch('api/editor',{
      method:'POST',
      body:JSON.stringify({
        action:'DEFAULTSCENE'
        , editorid:editorID
      })
    })
    let data = await res.json();
    console.log(data);
    if(data.action == 'UPDATE'){
      if(data.sceneid){
        console.log("SCENE ID:",data.sceneid)
        setSceneID(data.sceneid);
      }
    }
  }

  async function loadSceneObjects(){
    let res = await fetch('api/object3d',{
      method:'POST',
      body:JSON.stringify({
        action:'LIST'
        , sceneid:sceneID
      })
    })
    let data = await res.json();
    console.log("objects: ", data);
    if(data.action){
      if(data.action == 'UPDATE'){
        //api server need fixed?
        setSceneObjs(data.object3ds);
        
      }
      if(data.action == 'NOOBJECT3DS'){
        console.log("NO object3ds")
      }
    }
  }

  //side bar
  function ToggleTopSB(){
    //console.log("seteditorTSB");
    seteditorTSB(!editorTSB);
  }

  //side bar
  function ToggleRightSB(){
    //console.log("seteditorTSB");
    seteditorRSB(!editorRSB);
  }

  //update model for render {objects3D}
  function updateObjects(){
    //let obj = sceneObjsRef.current;
    let obj = sceneObjs;
    let objmap = obj.map((_entity)=>{
      return buildModel(_entity)
    })
    //console.log(objmap);
    setObjects3D(objmap);
  }

  //build model by type
  function buildModel(item){
    if(item.type=="cube"){
      //console.log("FOUND CUBE");
      return(<Cube
        key={item.id}
        visible={item.visible }
        
        //position={[0, 0, 0]}
        position={[item.position[0],item.position[1],item.position[2]]}
        rotation={[item.rotation[0],item.rotation[1],item.rotation[2]]}
        scale={[item.scale[0],item.scale[1],item.scale[2]]}
        //scale={[10,10,10]}
      >
      </Cube>)
    }else{
      return(<Cube
        position={[0, 0, 0]}
      >
      </Cube>)
    }
  }

  async function apiSaveObject3D(obj){
    if(!sceneID){
      console.log('ERROR NULL SCENEID');
    }
    let res = await fetch('api/object3d',{
      method:'POST'
      , body:JSON.stringify({ 
        action:'CREATE'
        , sceneid: sceneID
        , data:obj})
    });
    let data = await res.json();
    console.log(data);
  }
  async function apiUpdateObject3D(obj){
    if(!sceneID){
      console.log('ERROR NULL SCENEID');
    }
    let res = await fetch('api/object3d',{
      method:'POST'
      , body:JSON.stringify({ 
        action:'UPDATE'
        , sceneid: sceneID
        , data:obj})
    });
    let data = await res.json();
    console.log(data);
  }

  async function apiDeleteObject3D(obj){
    if(!sceneID){
      console.log('ERROR NULL SCENEID');
    }
    let res = await fetch('api/object3d',{
      method:'POST'
      , body:JSON.stringify({ 
        action:'DELETE'
        , sceneid: sceneID
        , data:obj})
    });
    let data = await res.json();
    console.log(data);
  }

  //call from the child component events
  function btnAction(event,param){
    console.log(event);
    console.log(param);
    if(param){
      if(param.action){
        if(param.action=="addcube"){
          let objs = sceneObjs;

          let data = {
            id: nanoid32()
            , name:"cube"
            , type:"cube"
            , visible: true
            , position:[0,0,0]
            , rotation:[0,0,0]
            , scale:[1,1,1]
          };
          apiSaveObject3D(data);

          objs.push(data);
          setSceneObjs(objs)
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
          let objs = sceneObjs;
          for(let i =0;i<objs.length;i++){
            if(objs[i].id == param.id){
              //objs[i].name = param.name;
              if(objs[i].visible){
                objs[i].visible=false;
              }else{
                objs[i].visible=true;
              }
              apiUpdateObject3D(objs[i]);
              setSceneObjs(objs);
              updateObjects();
              break;
            }
          }
        }

        if(param.action=="rename"){
          console.log(param.name);
          let objs = sceneObjs;
          for(let i =0;i<objs.length;i++){
            if(objs[i].id == param.id){
              objs[i].name = param.name;
              apiUpdateObject3D(objs[i]);
              setSceneObjs(objs);
              console.log("update rename object?");
              //update new render...
              updateObjects();
              break;
            }
          }
        }

        if(param.action=="remove"){
          console.log(param.name);
          let objs = sceneObjs;
          for(let i =0;i<objs.length;i++){
            if(objs[i].id == param.id){
              if(selectObject == objs[i]){
                setSelectObject(null);
              }
              apiDeleteObject3D(objs[i]);
              objs.splice(i,1);

              setSceneObjs(objs);
              console.log("update rename object?");
              //update new render...
              updateObjects();
              break;
            }
          }
        }

        if(param.action=="update"){
          console.log("[[[=== ACTION UPDATE ===]]");
          console.log(param);
          let objs = sceneObjs;
          for(let i =0;i<objs.length;i++){
            if(objs[i].id == param.id){
              console.log("[[[[==============  FOUND OBJECT ============]]]")
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

              if(param.key == "scaleX"){
                objs[i].scale[0] = param.setValue;
              }
              if(param.key == "scaleY"){
                objs[i].scale[1] = param.setValue;
              }
              if(param.key == "scaleZ"){
                objs[i].scale[2] = param.setValue;
              }

              apiUpdateObject3D(objs[i]);
              //update objs
              setSceneObjs(objs);
              //update select object
              setSelectObject(objs[i]);
              //update objs new render
              updateObjects();
              break;
            }
          }
        }

        //END ACTION STRING
      }
    }
  }

  return(<>
    
    <Canvas>
      <Foo />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[1.2, 0, 0]} />
      {/**/}
      {objects3D}
      {/* */}
      <CameraCtrl />
      
    </Canvas>
    
    <EditorTopSideBar
      isOpen={editorTSB}
      onRequestClose={ToggleTopSB}
    >
      <Link href="/">Home</Link>

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
