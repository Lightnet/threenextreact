/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from 'react';
// lib 
import { isEmpty, nanoid32 } from "../../lib/helper";

// event / use
import useFetch from "../hook/usefetch";
//import Link from 'next/link';
import useEvent from '../hook/useEvent';

// THREE
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport } from '@react-three/drei';

//three object3d
import { buildModel } from './buildmodel';
import ROrbitControl from '../entity/rorbitcontrol';

// UI / PANEL
import DropDownMenu from "../ui/edropdown";
import Modal from '../ui/emodal';
import {useNotifty, Color} from "../notify/notifyprovider";

import EditorTopSideBar from "./panel/sidebartop";
import EditorRightSideBar from "./panel/sidebarright";
import EditorLeftSideBar from "./panel/sidebarleft";

import EditorScene from "./panel/objectscene";
//import EditorProps from "./panel/objectprops";

import SceneSection from './scene/scenesection';
import AssetsSection from './assets/assetssection';

import { useEditor, useScene } from './context/editorprovider';
import ViewPanel from './panel/viewpanel';
import { Physics } from '@react-three/cannon';
import ThemeLink from '../theme/themelink';

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

  const {dispatchNotify} = useNotifty();

  const [isSideBarTop, setIsSideBarTop] = useState(true);
  const [isSideBarBottom, setIsSideBarBottom] = useState(false);
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
  const [enableOrbitControl, setEnableOrbitControl] = useState(true);
  const [enablePhysics, setEnablePhysics ] = useState(false);
  const [urlDebug, setUrlDebug ] = useState('/game');

  const togglePhysics = (e)=>{
    e.preventDefault();
    setEnablePhysics(state=>!state)
  }

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

  function openDebugWindow(){
    console.log("page tab?")
    window.open(urlDebug, '_blank', 'width=400, height=400');
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

  // check if the passing editor id for init checks.
  useEffect(() => {
    console.log("INIT SET MOUNT!");
    if(typeof editorid == 'undefined'){
      createInfo("No Editor ID is Assign to project.")
      return;
    }
    if(!isEmpty(editorid)){
      console.log("EDITOR ID FOUND")
      createInfo("Found and Checking Editor ID:" + editorid)
      setEditorID(editorid);
    }
  }, [editorid]);

  // check editor id
  useEffect(() => {
    if(!isEmpty(editorID)){
      //console.log("EDITOR ID FOUND")
      initEditorDefaultScene(); // fetch project data
    }
  }, [editorID]);

  // check for scene load
  useEffect(()=>{
    if(!isEmpty(sceneID)){
      getScenes();// fetch scene list
      loadSceneObjects(); // fetch scene object3ds
      setUrlDebug('/game?sceneid='+sceneID);
    }
  },[sceneID]);

  // get the scene name
  useEffect(()=>{
    for(let scene of scenes){
      console.log(scene);
      if(scene.id == sceneID){
        setSceneName(scene.name);
        break;
      }
    }
  },[scenes]);

  //check for object for Physics
  useEffect(()=>{
    statePhysics();
  },[enablePhysics]);

  
  //======
  // NOTIFY MESSAGES
  //======
  function notitfyInfo(children, autoClose) {
    dispatchNotify({
      type: 'add'
      , color:Color.info
      , children: children
      , autoClose: autoClose
    })
  }
  function notitfySuccess(children, autoClose) {
    dispatchNotify({
      type: 'add'
      , color:Color.success
      , children: children
      , autoClose: autoClose
    })
  }
  function notitfyWarning(children, autoClose) {
    dispatchNotify({
      type: 'add'
      , color:Color.warning
      , children: children
      , autoClose: autoClose
    })
  }
  function notitfyError(children, autoClose) {
    dispatchNotify({
      type: 'add'
      , color:Color.error
      , children: children
      , autoClose: autoClose
    })
  }
  function createInfo(msg){
    notitfyInfo(msg,true);
  }
  function msgSuccess(msg){
    notitfySuccess(msg,true);
  }
  function msgError(msg){
    notitfyError(msg,true);
  }
  function msgWarn(msg){
    notitfyWarning(msg,true);
  }

  //load editor settings? 
  async function initEditorDefaultScene(){
    //console.log("INIT... EDITOR ID:", editorID);
    if(isEmpty(editorID)){
      console.log("EDITOR ID NULL");
      createInfo("EDITOR ID NULL");
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

  //editor check and load scene check
  async function getScenes(){
    if(isEmpty(editorID)){
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

  //load scene objects list
  async function loadSceneObjects(){

    if(isEmpty(sceneID)){
      console.log("Scene ID EMPTY");
      return;
    }
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
  function ToggleSBTop(e){
    //e.preventDefault()
    //console.log("seteditorTSB");
    setIsSideBarTop(!isSideBarTop);
  }
  //side bar
  function ToggleSBRight(e){
    //e.preventDefault()
    //console.log("seteditorTSB");
    setIsSideBarRight(!isSideBarRight);
  }
  function ToggleSBLeft(e){
    //e.preventDefault()
    //console.log("seteditorTSB");
    setIsSideBarLeft(!isSideBarLeft);
  }

  async function apiSaveObject3D(obj){
    if(isEmpty(sceneID)){
      console.log('ERROR NULL SCENEID');
      return;
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
    if(isEmpty(sceneID)){
      console.log('ERROR NULL SCENEID');
      return;
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
    if(isEmpty(sceneID)){
      console.log('ERROR NULL SCENEID');
      msgWarn('Error Fail Null SceneID');
      return;
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
            , datatype:""
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
          data.datatype="box";
          data.shapePhysics='box';
          data.parameters={
            width:1,
            height:1,
            depth:1,
            widthSegments :1,
            heightSegments :1,
            depthSegments :1
          };
          data.mass=1;
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
        }

        if(args.action=="addplane"){
          data.name="plane";
          data.datatype="plane";
          data.shapePhysics='plane';
          data.mass=0;
          data.parameters={
            width:1,
            height:1,
            widthSegments :1,
            heightSegments :1
          };
          
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
        }

        if(args.action=="addsphere"){
          data.name="sphere";
          data.datatype="sphere";
          data.shapePhysics='sphere';
          data.mass=0;
          data.parameters={
            radius:1,
            widthSegments :8,
            heightSegments :8,
            phiStart :0,
            phiLength :6.2,
            thetaStart :0,
            thetaLength :3.1,
          };
          
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
        }

        if(args.action=="addcylinder"){
          data.name="cylinder";
          data.datatype="cylinder";
          data.shapePhysics='cylinder';
          data.mass=0;
          data.parameters={
            radiusTop:1,
            radiusBottom :1,
            height :1,
            radialSegments :8,
            heightSegments :1,
            openEnded :false,
            thetaStart :0,
            thetaLength: 6.2
          };
          
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
        }

        if(args.action=="addcircle"){
          data.name="circle";
          data.datatype="circle";
          data.shapePhysics='plane';
          data.mass=0;

          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
        }

        if(args.action=="addcone"){
          data.name="circle";
          data.datatype="circle";
          data.shapePhysics='plane';
          data.mass=0;
          
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
        }

        if(args.action=="addcamera"){
          data.name="camera";
          data.datatype="camera";
          data.shapePhysics='box';
          data.mass=0;
          data.parameters={
            fov:45,
            aspect:0.8823,
            near:1,
            far:100
          };
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
        }

        if(args.action=="addpointlight"){
          data.name="pointlight";
          data.datatype="pointlight";
          data.shapePhysics='box';
          data.mass=0;
          data.parameters={
            color:45,
            intensity:1,
            distance:1000,
            decay:1
          };
          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
        }

        if(args.action=="addambientlight"){
          data.name="ambientlight";
          data.datatype="ambientlight";
          data.shapePhysics='box';
          data.mass=0;

          apiSaveObject3D(data);
          setObject3Ds([...object3Ds,data]);
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


              if(args.objkey == "parameters"){
                console.log("parameters")
                console.log(args.parameters)
                item.parameters = args.setValue;
              }

              if(args.objkey == "material"){
                console.log("material")
                console.log(args.material)

                //need to check material id and layer later...
                item.material=[];
                item.material[0] = args.setValue;
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
    return (<></>)
  }

  function showViewModal(name){
    setViewModal(name)
    setIsOpenModal(true);
  }

  function toggleOrbitControl(e){
    e.preventDefault()
    setEnableOrbitControl(!enableOrbitControl);
  }

  function clickPreventD(e){
    e.preventDefault()
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
      {/*
      */}
    </Canvas>
    {/*
    */}
    
    <EditorTopSideBar
      isOpen={isSideBarTop}
      onRequestClose={ToggleSBTop}
    >
      {
      //<Link href="/">Home</Link>
      }
      <DropDownMenu menuname="File" >
        {/*
        <a href="#" >Project List</a>
        <a href="#" >Settings</a>
        <a href="#" >Config</a>
        */}
      </DropDownMenu>

      <DropDownMenu menuname="Select" >
        <a href="#" onClick={clickPreventD}>Select Object</a> <br />
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
        <a href="#" onClick={(e)=>callBackOPS({action:"addcylinder"})}>Add Cylinder</a> <br/>
        <a href="#" onClick={(e)=>callBackOPS({action:"addsphere"})}>Add Sphere</a> <br/>
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
        <ThemeLink />
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

    <Modal isOpen={isOpenModal} closeModal={closeModal} >
      {renderModal()}
    </Modal>

  </>);
}
/*

*/