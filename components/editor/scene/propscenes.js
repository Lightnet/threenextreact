/*
  LICENSE: MIT
  Created by: Lightnet

  view port for scene?

*/

import { useState, useEffect } from "react";
import { useEditor, useScene } from "../context/editorprovider";
import useFetch from "../../hook/usefetch";
import { isEmpty } from "../../../lib/helper";

export default function PropScenes({ops}) {

  const {editorID, setEditorID} = useEditor();

  const { sceneID, setSceneID} = useScene();
  const {scenes, setScenes} = useEditor();

  const {sceneName,setSceneName} =useEditor();

  const [isEdit,setIsEdit]=useState(false);
  const [editName,setEditName]=useState(false);
  const [selectID,setSelectID]=useState('');
  //const [selectID,setSelectID]=useState('');

  ///console.log(editorID);

  useEffect(() => {
    console.log("get scene")
    if(sceneID){
      for(let scene of scenes){
        if(scene.id  == sceneID){
          setSceneName(scene.name)
          break;
        }
        break;
      }
    }
    return  ()=>{
      console.log('propscene clean');
    }
  },[sceneID]);
  
  function typeEditName(e){
    setEditName(e.target.value);
  }

  function enterEditName(event){
    if (event.keyCode === 13) {
      //check for string empty
      if(isEmpty(event.target.value)){
        console.log("Empty!");
        return;
      }
      updateNameScene();
      
      setIsEdit(false);
    }
  }

  async function createScene(){
    if(!editorID){
      console.log('editorid NULL');
      return;
    }
    let data = await useFetch('api/scene',{
      method:'POST'
      , body:JSON.stringify({action:'CREATE',id:editorID})
    });
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH SCENES');
    }
    if(data.action){
      if(data.action=='CREATE'){
        setScenes([...scenes,data.scene]);
      }
    }
  }

  async function deleteScene(sceneid){
    
    let data = await useFetch('api/scene',{
      method:'DELETE'
      , body:JSON.stringify({id:sceneid})
    });
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH DELETE SCENE');
    }
    if(data.action){
      if(data.action=='DELETE'){
        setScenes(scenes.filter(item=>item.id !== data.id));
      }
    }
  }

  async function updateNameScene(){
    
    let data = await useFetch('api/scene',{
      method:'PATCH'
      , body:JSON.stringify({
        action:'PATCH',
        id:selectID,
        sceneName:editName,
      })
    });
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH SCENES');
    }
    if(data.action){
      if(data.action=='PATCH'){
        setScenes(scenes.map(item=>
          item.id === data.scene.id
          ? {...item,name:data.scene.name}
          : item
      ));
      }
    }
  }

  function editSceneID(id){
    console.log('edit?')
    setSelectID(id);
    setIsEdit(true);
    for(const scene of scenes){
      if(scene.id == id){
        setEditName(scene.name);
        break;
      }
    }
  }

  return (<>
  <div>
    <div>
      <label>ID:{sceneID}</label>
    </div>
    <div>
      <label>Name: {sceneName}</label>
    </div>
    {scenes.map((item)=>{
      return(<div key={item.id}>
        {(isEdit == true && item.id == selectID)?(
          <input value={editName} onChange={typeEditName} onKeyUp={enterEditName}/>
        ):(
          <label> {item.name} </label> 
        )}
        
        
        <img src="/icon/edit01.svg" width="16" height="16" onClick={()=>editSceneID(item.id)} />
        <img src="/icon/select01.svg" width="16" height="16" onClick={()=>ops({action:'loadscene',id:item.id})} />
        <img src="/icon/delete01.svg" width="16" height="16" />
      </div>);
    })}
  </div>
    </>);
}
/*
<input value={sceneName} ></input> <input value={description} onChange={typeDesription}></input><button onClick={updateNameScene}> Update </button>
<button onClick={()=>createScene()}>Create</button>
<button onClick={()=>deleteScene(item.id)}>Delete</button>  
        <button onClick={()=>editSceneID(item.id)}>Select Edit</button>
        <button onClick={()=>ops({action:'loadscene',id:item.id})}>Load</button>
*/