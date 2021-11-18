/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
import useFetch from "../../hook/usefetch";
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

import { nanoid32 } from "../../../lib/helper";

import Box from '../../entities/box';
import Cube from '../../entities/cube';
import Foo from '../../entities/foo';
//import CameraTest from '../../entities/cameratest';
import CameraCtrl from '../../entities/cameractrl';

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
    let data = await useFetch('api/editor',{
      method:'POST',
      body:JSON.stringify({
        action:'DEFAULTSCENE'
        , editorid:editorID
      })
    })
    console.log(data);
    if(data.error){
      console.log("FETCH GET DEFAULT SCENE ID");
      return;
    }

    if(data.action == 'UPDATE'){
      if(data.sceneid){
        console.log("SCENE ID:",data.sceneid)
        setSceneID(data.sceneid);
      }
    }
  }

  async function loadSceneObjects(){
    let data = await useFetch('api/object3d',{
      method:'POST',
      body:JSON.stringify({
        action:'LIST'
        , sceneid:sceneID
      })
    })
    if(data.error){
      console.log("FETCH ERROR OBJECT3DS")
      return;
    }
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
    if(sceneObjs){
      let obj = sceneObjs;
      console.log("obj>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(obj);
      let objmap = obj.map((_entity)=>{
        return buildModel(_entity)
      })
      //console.log(objmap);
      setObjects3D(objmap);
    }
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
    let data = await useFetch('api/object3d',{
      method:'POST'
      , body:JSON.stringify({ 
        action:'CREATE'
        , sceneid: sceneID
        , data:obj})
    });
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH SAVE OBJECT3D");
      return;
    }


  }
  async function apiUpdateObject3D(obj){
    if(!sceneID){
      console.log('ERROR NULL SCENEID');
    }
    let data = await useFetch('api/object3d',{
      method:'POST'
      , body:JSON.stringify({ 
        action:'UPDATE'
        , sceneid: sceneID
        , data:obj})
    });
    if(data.error){
      console.log("ERROR FETCH UPDATE OBJECT3D");
      return;
    }
    console.log(data);

  }

  async function apiDeleteObject3D(id){
    if(!sceneID){
      console.log('ERROR NULL SCENEID');
    }
    let data = await useFetch('api/object3d',{
      method:'POST'
      , body:JSON.stringify({ 
        action:'DELETE'
        , sceneid: sceneID
        , id:id
      })
    });
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH DELETE OBJECT3D")
      return;
    }


    
  }

  //call from the child component events
  function btnAction(event,param){
    console.log(event);
    console.log(param);
    if(param){
      if(param.action){
        if(param.action=="addcube"){
          //let objs = sceneObjs;
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

          //objs.push(data);
          setSceneObjs([...sceneObjs,data]);
          updateObjects();
        }

        if(param.action=="select"){
          for(const obj3D of sceneObjs){
            if(obj3D.id == param.id){
              setSelectObject(obj3D);
              break;
            }
          }
        }

        if(param.action=="visible"){
          console.log(param.name);
          //need to fixed this array new format array
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

          setSceneObjs(sceneObjs.map(item=>{
            if(item.id === param.id){
              item.name=param.name;
              apiUpdateObject3D(item);
              return {...item, name:param.name};
            }else{
              return item
            }
          }));

          updateObjects();
        }

        if(param.action=="remove"){
          console.log(param.name);
          apiDeleteObject3D(param.id);
          for(const obj3d of sceneObjs){
            if(selectObject == obj3d){
              setSelectObject(null);
            }
          }
          setSceneObjs(sceneObjs.filter(item=>item.id !== param.id ));
          updateObjects();
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
