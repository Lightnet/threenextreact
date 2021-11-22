/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
// lib 
import { nanoid32 } from "../../lib/helper";

// event / use
import useFetch from "../hook/usefetch";
import Link from 'next/link';
import useEvent from '../hook/useEvent';

// THREE
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei';

//three object3d
import Box from '../entities/box';
import Cube from '../entities/cube';
import Foo from '../entities/foo';
//import CameraTest from '../../entities/cameratest';
import CameraCtrl from '../entities/cameractrl';

// UI / PANEL
import ThemeSection from "../system/themesection";
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

export default function EditorSection({editorid}){

  const [isSideBarTop, setIsSideBarTop] = useState(true);
  const [isSideBarBottom, setIsSideBarBottom] = useState(true);
  const [isSideBarLeft, setIsSideBarLeft] = useState(true);
  const [isSideBarRight, setIsSideBarRight] = useState(true);

  const [selectObject, setSelectObject] = useState(null); //select object for props div

  //const [object3Ds, setObject3Ds] = useState([]); // scene objects array json
  const {object3Ds, setObject3Ds} = useEditor();

  const [objects3D, setObjects3D] = useState([]); // scene objects render react
  const [physics3D, setPhysics3D] = useState([]); //physic objects

  //const [editorID, setEditorID] = useState(null);
  const {editorID, setEditorID} = useEditor();

  //const [sceneID, setSceneID] = useState(null);
  const {sceneID, setSceneID} = useScene();

  const [viewModal, setViewModal] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [notify,setNotify] = useState(); //notify call when detect change in state

  //useEffect(()=>{
  //},[]);

  useEvent('keydown',keydown);
  useEvent('keyup',keyup);

  function keydown(e){
    console.log("press....");
  }

  function keyup(e){
    console.log("press....");
  }

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
    if(object3Ds){
      updateObjects();//update scene object3ds
    }
  },[object3Ds]);

  
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
        setObject3Ds(data.object3ds);
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

        if(args.action=="addcube"){
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
          setObject3Ds([...object3Ds,data]);
          updateObjects();
        }

        if(args.action=="select"){
          for(const obj3D of object3Ds){
            if(obj3D.id == args.id){
              setSelectObject(obj3D);
              break;
            }
          }
        }

        if(args.action=="visible"){
          //console.log(args.visible);
          setObject3Ds(object3Ds.map(item=>{
            if(item.id === args.id){
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
            if(item.id === args.id){
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
          setObject3Ds(object3Ds.filter(item=>item.id !== args.id ));
          updateObjects();
        }

        if(args.action=="update"){
          console.log("[[[=== ACTION UPDATE ===]]");
          console.log(args);

          setObject3Ds(object3Ds.map(item=>{
            if(item.id === args.id){
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

              apiUpdateObject3D(item);
              //check select object client
              for(const obj3d of object3Ds){
                if(selectObject == obj3d){
                  setSelectObject(item);
                }
              }

              return item;
            }else{
              return item;
            }
          }));
          updateObjects();

        }

        if(args.action=='loadscene'){
          setObject3Ds([]);
          setObjects3D([]);
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

  //function showScenes(){
    //setViewModal('scenes')
    //setIsOpenModal(true);
  //}

  return(<>
    
    <Canvas>
      <Foo />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[1.2, 0, 0]} />
      
      {/*objects3D*/}
      {object3Ds.map((_entity)=>{
        return buildModel(_entity)
      })}

      
      <CameraCtrl />
      
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
        <a href="#" >Select Object</a>
      </DropDownMenu>

      {/*
      <DropDownMenu menuname="Tools" >
        <a href="#" >Server</a>
        <a href="#" >Network</a>
        <a href="#" >Client</a>
      </DropDownMenu>
      */}

      <DropDownMenu menuname="View" >
        <a href="#" onClick={()=>showViewModal('assets')} >Assets</a><br/>
        <a href="#" onClick={()=>showViewModal('scenes')} >Scenes</a>
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
        
        <a href="#" onClick={(e)=>callBackOPS({action:"addcube"})}>Add Cube</a>
        {/*
        <a href="#" onClick={(e)=>callBackOPS({action:"addscene"})}>Add Scene</a>
        <a href="#" onClick={(e)=>callBackOPS({action:"addsphere"})}>Add Sphere</a>
        <a href="#" onClick={(e)=>callBackOPS({action:"addplane"})}>Add Plane</a>
        <a href="#" onClick={(e)=>callBackOPS({action:"addcamera"})}>Add Camera</a>
        <a href="#" onClick={(e)=>callBackOPS({action:"addlight"})}>Add Light</a>
        */}
      </DropDownMenu>

      <DropDownMenu menuname="Prefab" >
        <a href="#" >User Custom</a>
      </DropDownMenu>

      <DropDownMenu menuname="Build" >
        {/*}
        <a href="#" >Play</a>
        <a href="#" >Debug Play</a>
        <a href="#" >Publish</a>
      */}
      </DropDownMenu>

      <DropDownMenu menuname="Help" >
        <a href="#" >About</a><br/>
        <a href="#" >Docs</a><br/>
        <a href="#" >Github</a>
        {/*<a href="#" >Plugins</a>*/}
      </DropDownMenu>

      

      <ThemeSection></ThemeSection>

      <label> Editor ID: {editorID} </label>
      
    </EditorTopSideBar>

    <EditorRightSideBar
      isOpen={isSideBarRight}
      onRequestClose={ToggleSBRight}
    >
      
      <EditorScene
        ops={callBackOPS}
        object3ds={object3Ds}
        ></EditorScene>
      {/* */}
      <EditorProps
        selectObject={selectObject}
        ops={callBackOPS}
      ></EditorProps>
         
    </EditorRightSideBar>

    <EditorLeftSideBar
      isOpen={isSideBarLeft}
      onRequestClose={ToggleSBLeft}
      >
      <ViewPanel ops={callBackOPS}></ViewPanel>

    </EditorLeftSideBar>

    <div style={{position:'fixed',top:'28px',left:100}}>
      <label>Side Bars:</label>
      <button  onClick={ToggleSBTop}>Top</button>
      <button  onClick={ToggleSBRight}>Right</button>
      <button  onClick={ToggleSBLeft}>Left</button>
      {/*
      <button  onClick={ToggleRightSB}>Bottom</button>
      <button  onClick={ToggleRightSB}>Left</button>
       */}
    </div>

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
