/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useCallback, useEffect, useState } from 'react';
// lib 
import { nanoid32 } from "../../lib/helper";

// event / use
import useFetch from "../hook/usefetch";
import Link from 'next/link';
import useEvent from '../hook/useEvent';

// THREE
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, PositionalAudio, GizmoHelper, GizmoViewport } from '@react-three/drei';

//three object3d
import { buildModel } from './buildmodel';
import ROrbitControl from '../entities/rorbitcontrol';

// UI / PANEL
//import ThemeSection from "../system/themesection";
import DropDownMenu from "../ui/edropdown";
import Modal from '../ui/emodal';
import {NotificationsManager,Color} from "../notify";

import EditorTopSideBar from "./panel/sidebartop";
import EditorRightSideBar from "./panel/sidebarright";
import EditorLeftSideBar from "./panel/sidebarleft";

import EditorScene from "./panel/objectscene";
import EditorProps from "./panel/objectprops";

import SceneSection from './scene/scenesection';
import AssetsSection from './assets/assetssection';

import { useEditor, useScene } from './context/editorprovider';
import ViewPanel from './panel/viewpanel';
import { Physics } from '@react-three/cannon';

// https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

export default function EditorSection({editorid}){

  const [isSideBarTop, setIsSideBarTop] = useState(true);
  const [isSideBarBottom, setIsSideBarBottom] = useState(true);
  const [isSideBarLeft, setIsSideBarLeft] = useState(true);
  const [isSideBarRight, setIsSideBarRight] = useState(true);

  //const [selectObject, setSelectObject] = useState(null); //select object for props div
  const {selectObject, setSelectObject} = useEditor();

  //const [object3Ds, setObject3Ds] = useState([]); // scene objects array json
  const {object3Ds, setObject3Ds} = useEditor();

  //const [objects3D, setObjects3D] = useState([]); // scene objects render react
  //const [physics3D, setPhysics3D] = useState([]); //physic objects

  //const [editorID, setEditorID] = useState(null);
  const {editorID, setEditorID} = useEditor();
  const {editorName, setEditorName} = useEditor();

  //const [sceneID, setSceneID] = useState(null);
  const {sceneID, setSceneID} = useScene();
  const {scenes, setScenes} = useEditor();
  const {sceneName, setSceneName} = useEditor();

  const [viewModal, setViewModal] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [notify,setNotify] = useState(); //notify call when detect change in state

  const [enableOrbitControl, setEnableOrbitControl] = useState(true);

  const [enablePhysics, setEnablePhysics ] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [urlDebug, setUrlDebug ] = useState('/game');

  const togglePhysics = useCallback(()=>{
    setEnablePhysics(state=>!state);
  },[enablePhysics])

  function statePhysics(){
    setObject3Ds(object3Ds.map(item=>{
      if(item.isPhysics == true){
        item.enablePhysics = enablePhysics;
        //item.isPhysics = false;
      }
      //return {...item,enablePhysics:true};
      return item
    }))
  }
  
  function resetPhysics(){
    //setEnablePhysics(state=>!state);
    console.log("reset");
  }

  function openDebugWindow(){
    console.log("page tab?")
    window.open(urlDebug, '_blank', 'width=400, height=400');
  }

  useEffect(()=>{
    const theme = localStorage.getItem('theme');
    if(theme){
      document.documentElement.setAttribute('data-theme', theme);
    }
  },[]);

  function changeTheme(name){
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem('theme', name);
  }

  useEvent('keydown',keydown);
  useEvent('keyup',keyup);

  function keydown(e){
    //console.log("press....");
  }

  function keyup(e){
    //console.log("press....");
    console.log(e.keyCode)
    if(e.keyCode == 9){//tab
      setIsSideBarTop(true);
    }
  }

  useEffect(() => {
    //console.log("INIT SET MOUNT!");
    if(editorid){
      //console.log("EDITOR ID FOUND")
      setEditorID(editorid);
      initEditorDefaultScene();
      getScenes();
    }else{
      //console.log("NOT FOUND")
    }
    return ()=>{
      //console.log('EDITOR CLEAN UP!');
    };
  }, [editorid,editorID]);

  useEffect(()=>{
    if(sceneID){
      loadSceneObjects();
      for(let scene of scenes){
        if(scene.id == sceneID){
          setSceneName(scene.name);
          break;
        }
      }
      setUrlDebug('/game?sceneid='+sceneID);
    }
  },[sceneID]);

  useEffect(()=>{
    statePhysics();
  },[enablePhysics]);
  
  function notitfyInfo(children, autoClose) {
    //console.log("info");
    return setNotify({
      color: Color.info,
      children,
      autoClose,
    });
  }
  function notitfySuccess(children, autoClose) {
    return setNotify({
      color: Color.success,
      children,
      autoClose,
    });
  }
  function notitfyWarning(children, autoClose) {
    return setNotify({
      color: Color.warning,
      children,
      autoClose,
    });
  }
  function notitfyError(children, autoClose) {
    return setNotify({
      color: Color.error,
      children,
      autoClose,
    });
  }
  function createInfo(msg){
    notitfyInfo(<label>{msg}</label>,true);
  }
  function msgSuccess(msg){
    notitfySuccess(<label>{msg}</label>,true);
  }
  function msgError(msg){
    notitfyError(<label>{msg}</label>,true);
  }
  function msgWarn(msg){
    notitfyWarning(<label>{msg}</label>,true);
  }

  async function initEditorDefaultScene(){
    //console.log("INIT... EDITOR ID:", editorID);
    if(!editorID){
      return;
    }
    let data = await useFetch('api/editor',{
      method:'POST',
      body:JSON.stringify({
        action:'INFO'
        , editorid:editorID
      })
    })
    //console.log(data);
    if(data.error){
      console.log("FETCH GET DEFAULT SCENE ID");
      msgWarn('Fetch Error Fail GET default Scene ID');
      return;
    }

    if(data.action == 'UPDATE'){
      if(data.sceneid){
        //console.log("SCENE ID:",data.sceneid);
        setSceneID(data.sceneid);
        setEditorName(data.editorname);
      }
    }
  }

  async function getScenes(){
    if(!editorID){
      //console.log('editorid NULL');
      return;
    }
    let data = await useFetch('api/scene',{
      method:'POST'
      , body:JSON.stringify({action:'SCENES',id:editorID})
    });
    //console.log(data);
    if(data.error){
      console.log('ERROR FETCH SCENES');
    }
    if(data.action){
      if(data.action=='SCENES'){
        setScenes(data.scenes);
      }
    }
  }

  async function loadSceneObjects(){
    let data = await useFetch('api/object3d',{
      method:'POST',
      body:JSON.stringify({
        action:'OBJECT3DS'
        , sceneid:sceneID
      })
    })
    if(data.error){
      console.log("FETCH ERROR OBJECT3DS")
      msgWarn('Fetch Error Fail GET OBJECT3DS');
      return;
    }
    //console.log("objects: ", data);
    if(data.action){
      if(data.action == 'UPDATE'){
        //api server need fixed?
        let obj3ds = data.object3ds;
        obj3ds.map((item)=>{
          item.enablePhysics=enablePhysics;
          return {...item};
        })
        //console.log(obj3ds);
        setObject3Ds(obj3ds);
      }
      if(data.action == 'NOOBJECT3DS'){
        console.log("NO object3ds")
      }
    }
  }

  //side bar
  function ToggleSBTop(){
    //console.log("seteditorTSB");
    setIsSideBarTop(!isSideBarTop);
  }
  //side bar
  function ToggleSBRight(){
    //console.log("seteditorTSB");
    setIsSideBarRight(!isSideBarRight);
  }
  function ToggleSBLeft(){
    //console.log("seteditorTSB");
    setIsSideBarLeft(!isSideBarLeft);
  }
  //update model for render {objects3D}
  function updateObjects(){
    /*
    console.log("enablePhysics:",enablePhysics)
    if(object3Ds){
      let obj = object3Ds;
      //console.log(obj);
      let objmap = obj.map((_entity)=>{
        return buildModel(_entity)
      })
      //console.log(objmap);
      setObjects3D(objmap);
    }
    */
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
    //console.log(data);
    if(data.error){
      //console.log("ERROR FETCH SAVE OBJECT3D");
      msgError('Fetch Error on Save Object3D');
      return;
    }
    msgSuccess('Success! Save Object3D');
  }
  async function apiUpdateObject3D(obj){
    if(!sceneID){
      console.log('ERROR NULL SCENEID');
    }
    let data = await useFetch('api/object3d',{
      method:'PATCH'
      , body:JSON.stringify({ 
        action:'UPDATE'
        , sceneid: sceneID
        , data:obj})
    });
    //console.log(data);
    if(data.error){
      console.log("ERROR FETCH UPDATE OBJECT3D");
      msgError('Fetch Error Fail UPDATE object3D');
      return;
    }
  }
  async function apiDeleteObject3D(id){
    if(!sceneID){
      console.log('ERROR NULL SCENEID');
      msgWarn('Error Fail Null SceneID');
    }
    let data = await useFetch('api/object3d',{
      method:'DELETE'
      , body:JSON.stringify({ 
        id:id
      })
    });
    //console.log(data);
    if(data.error){
      //console.log("ERROR FETCH DELETE OBJECT3D")
      msgError('Fetch Error on DELETE Object3D');
      return;
    }
    msgSuccess('Success! DELETE Object3D');
  }

  //call from the child component events
  function callBackOPS(args){
    console.log(args);
    if(args){
      if(args.action){
        console.log("args.action: ",args.action)
        let data;
        if(args.action.includes('add')){
          console.log("KEYWORD DETECT ADD");

          data = {
            objectid: nanoid32()
            , name:""
            , type:""
            , visible: true
            , isPhysics: false
            , enablePhysics: false
            , shapePhysics: 'box'
            , mass: 0
            , position:[0,0,0]
            , rotation:[0,0,0]
            , scale:[1,1,1]
          };
        }

        if(args.action=="addbox"){
          data.name="box";
          data.type="box";
          data.shapePhysics='box';
          data.mass=1;
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
          updateObjects();
        }

        if(args.action=="addplane"){
          data.name="plane";
          data.type="plane";
          data.shapePhysics='plane';
          data.mass=0;
          
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
          updateObjects();
        }

        if(args.action=="addcircle"){
          data.name="circle";
          data.type="circle";
          data.shapePhysics='plane';
          data.mass=0;

          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
          updateObjects();
        }

        if(args.action=="addcone"){
          data.name="circle";
          data.type="circle";
          data.shapePhysics='plane';
          data.mass=0;
          
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
          updateObjects();
        }

        if(args.action=="addcamera"){
          data.name="camera";
          data.type="camera";
          data.shapePhysics='box';
          data.mass=0;
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
          updateObjects();
        }

        if(args.action=="addpointlight"){
          data.name="pointlight";
          data.type="pointlight";
          data.shapePhysics='box';
          data.mass=0;
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
          updateObjects();
        }

        if(args.action=="addambientlight"){
          data.name="ambientlight";
          data.type="ambientlight";
          data.shapePhysics='box';
          data.mass=0;

          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
          updateObjects();
        }

        if(args.action=="select"){
          for(const obj3D of object3Ds){
            if(obj3D.objectid == args.id){
              setSelectObject(obj3D);
              break;
            }
          }
        }

        if(args.action=="visible"){
          //console.log(args.visible);
          setObject3Ds(object3Ds.map(item=>{
            if(item.objectid === args.id){
              console.log(item.visible);
              //if(item.visible){
                item.visible=!item.visible;
              //}
              apiUpdateObject3D(item);
              //return {...item, name:args.name};
              return item
            }else{
              return item
            }
          }));
          updateObjects();
        }

        if(args.action=="rename"){
          console.log(args.name);
          setObject3Ds(object3Ds.map(item=>{
            if(item.objectid === args.id){
              item.name=args.name;
              apiUpdateObject3D(item);
              return {...item, name:args.name};
            }else{
              return item
            }
          }));
          updateObjects();
        }

        if(args.action=="remove"){
          console.log(args.name);
          apiDeleteObject3D(args.id);
          for(const obj3d of object3Ds){
            if(selectObject == obj3d){
              setSelectObject(null);
            }
          }
          setObject3Ds(object3Ds.filter(item=>item.objectid !== args.id ));
          updateObjects();
        }

        if(args.action=="update"){
          console.log("[[[=== ACTION UPDATE ===]]");
          console.log(args);

          setObject3Ds(object3Ds.map(item=>{
            //console.log(item.objectid);
            if(item.objectid === args.id){
              //return {...item, name:args.name};

              if(args.objkey == "positionX"){
                item.position[0] = args.setValue;
              }
              if(args.objkey == "positionY"){
                item.position[1] = args.setValue;
              }
              if(args.objkey == "positionZ"){
                item.position[2] = args.setValue;
              }

              if(args.objkey == "rotationX"){
                item.rotation[0] = args.setValue;
              }
              if(args.objkey == "rotationY"){
                item.rotation[1] = args.setValue;
              }
              if(args.objkey == "rotationZ"){
                item.rotation[2] = args.setValue;
              }

              if(args.objkey == "scaleX"){
                item.scale[0] = args.setValue;
              }
              if(args.objkey == "scaleY"){
                item.scale[1] = args.setValue;
              }
              if(args.objkey == "scaleZ"){
                item.scale[2] = args.setValue;
              }

              if(args.objkey == "isPhysics"){
                item.isPhysics = args.setValue;
              }

              if(args.objkey == "mass"){
                item.mass = args.setValue;
              }

              apiUpdateObject3D(item);
              //check select object client
              for(const obj3d of object3Ds){
                if(selectObject.objectid == obj3d.objectid){
                  console.log("select...")
                  //setSelectObject(null);
                  setSelectObject(item);
                  break;
                }
              }
              return item;
            }else{
              return item;
            }
          }));

          //useCallback(()=>{setObject3Ds(object3Ds)},[object3Ds])

          updateObjects();

        }

        if(args.action=='loadscene'){
          setObject3Ds([]);
          //setObjects3D([]);
          setSelectObject(null);
          setSceneID(args.id);
        }

        //END ACTION STRING
      }
    }
  }

  function closeModal(){
    setIsOpenModal(false);
    setViewModal(null);//clean up react element
  }

  function renderModal(){
    if(viewModal=='scenes'){
      return <SceneSection editorid={editorID} ops={callBackOPS}></SceneSection>
    }else if(viewModal == 'assets'){
      return <AssetsSection editorid={editorID}></AssetsSection>
    }
    return (<>
    </>)
  }

  function showViewModal(name){
    setViewModal(name)
    setIsOpenModal(true);
  }

  function toggleOrbitControl(){
    setEnableOrbitControl(!enableOrbitControl);
  }

  return(<>
    
    <Canvas>

      <Physics>
        {object3Ds.map((entity)=>{
          //if(entity.isPhysics == true){
            return buildModel(entity)
          //}
        })}
      </Physics>

      {enableOrbitControl && <ROrbitControl />}

      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
        >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      
    </Canvas>
    {/*
    */}
    
    <EditorTopSideBar
      isOpen={isSideBarTop}
      onRequestClose={ToggleSBTop}
    >
      <Link href="/">Home</Link>

      <DropDownMenu menuname="File" >
        {/*
        <a href="#" >Project List</a>
        <a href="#" >Settings</a>
        <a href="#" >Config</a>
        */}
      </DropDownMenu>

      <DropDownMenu menuname="Select" >
        <a href="#" >Select Object</a> <br />
        <a href="#" onClick={toggleOrbitControl}> Orbit Control {enableOrbitControl?("on"):("off")} </a>
      </DropDownMenu>

      {/*
      <DropDownMenu menuname="Tools" >
        <a href="#" >Server</a>
        <a href="#" >Network</a>
        <a href="#" >Client</a>
      </DropDownMenu>
      */}

      <DropDownMenu menuname="View" >
        <a href="#" onClick={()=>showViewModal('assets')} >Assets</a> <br/>
        <a href="#" onClick={()=>showViewModal('scenes')} >Scenes</a> <br/>

        <a href="#" onClick={ToggleSBTop} >Top SideBar</a> <br/>
        <a href="#" onClick={ToggleSBRight} >Right SideBar</a> <br/>
        <a href="#" onClick={ToggleSBLeft} >Left SideBar</a> <br/>

        {/*
        <a href="#" onClick={()=>showViewModal('materials')} >Materials</a>
        <a href="#" onClick={()=>showViewModal('textures')} >Textures</a>
        <a href="#" onClick={()=>showViewModal('models')} >Models</a>
        <a href="#" >Props</a>
        <a href="#" onClick={()=>showViewModal('script')} >Script</a>
        <a href="#" onClick={()=>showViewModal('blueprint')} >Blueprint</a>
        <a href="#" onClick={()=>showViewModal('prefab')} >Prefab</a>
        */}
      </DropDownMenu>

      <DropDownMenu menuname="Scene" >
        
        <a href="#" onClick={(e)=>callBackOPS({action:"addplane"})}>Add Plane</a> <br/>
        <a href="#" onClick={(e)=>callBackOPS({action:"addbox"})}>Add Box</a> <br/>
        <a href="#" onClick={(e)=>callBackOPS({action:"addcircle"})}>Add Circle</a> <br/>
        <a href="#" onClick={(e)=>callBackOPS({action:"addcone"})}>Add Cone</a> <br/>
        <a href="#" onClick={(e)=>callBackOPS({action:"addpointlight"})}>Add Point Light</a> <br/>
        <a href="#" onClick={(e)=>callBackOPS({action:"addambientlight"})}>Add Ambient Light</a> <br/>
        <a href="#" onClick={(e)=>callBackOPS({action:"addcamera"})}>Add Camera</a>
        {/*
        <a href="#" onClick={(e)=>callBackOPS({action:"addscene"})}>Add Scene</a>
        <a href="#" onClick={(e)=>callBackOPS({action:"addsphere"})}>Add Sphere</a>
        */}
      </DropDownMenu>

      <DropDownMenu menuname="Prefab" >
        <a href="#" >User Custom</a>
      </DropDownMenu>

      <DropDownMenu menuname="Physics" >
        <a href="#" onClick={togglePhysics}>Enable {enablePhysics?("On"):("Off")} </a>
      </DropDownMenu>

      <DropDownMenu menuname="Build" >
        
        <a href="#" >Play</a> <br />
        <a href="#" onClick={()=>openDebugWindow()}>Debug </a> <br />
        <a href="#" >Publish</a>
      </DropDownMenu>
      {/*
      <Link href={urlDebug} >Debug </Link>
      */}

      <DropDownMenu menuname="Help" >
        <a href="#" >About</a><br/>
        <a href="#" >Docs</a><br/>
        <a href="#" >Github</a>
        {/*<a href="#" >Plugins</a>*/}
      </DropDownMenu>

      <DropDownMenu menuname="Theme" >
        <a href="#" onClick={()=>changeTheme('light')}> Light </a> <br/>
        <a href="#" onClick={()=>changeTheme('dark')}> Dark </a>
      </DropDownMenu>

      <label>[Editor Name:] {editorName} </label>
      <label>[Scene Name:] {sceneName} </label>
      {/*<label> Editor ID: {editorID} </label>*/}
      
    </EditorTopSideBar>

    <EditorRightSideBar
      isOpen={isSideBarRight}
      onRequestClose={ToggleSBRight}
    >
      
      <EditorScene
        ops={callBackOPS}
        object3ds={object3Ds}
        ></EditorScene>

      <ViewPanel 
        currentView="props"
        ops={callBackOPS}>          
        </ViewPanel>

    </EditorRightSideBar>

    <EditorLeftSideBar
      isOpen={isSideBarLeft}
      onRequestClose={ToggleSBLeft}
      >
      <ViewPanel ops={callBackOPS}></ViewPanel>

    </EditorLeftSideBar>

    <Modal 
      isOpen={isOpenModal}
      closeModal={closeModal}
    >
      {renderModal()}
    </Modal>

    <NotificationsManager
      setNotify={notify}
    />
    
  </>);
}
/*

*/
