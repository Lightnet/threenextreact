/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import useFetch from "../../hook/usefetch";

export default function SceneSection({editorid,ops}) {
  const [scenes, setScenes] = useState([])
  const [editorID, setEditorID] = useState(null);
  const [sceneID, setSceneID] = useState(null);

  const [sceneName,setSceneName]=useState("")
  const [description,setDescription]=useState("description")
  
  useEffect(() => {
    console.log("hello?")
    if(editorid){
      console.log("scene section editorid:", editorid);
      setEditorID(editorid);
      getScenes();
    }
    return  ()=>{
      console.log('scenes clean');
      setEditorID(null)
    }
  },[editorid,editorID]);

  async function getScenes(){
    if(!editorID){
      console.log('editorid NULL');
      return;
    }
    let data = await useFetch('api/scene',{
      method:'POST'
      , body:JSON.stringify({action:'SCENES',id:editorID})
    });
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH SCENES');
    }
    if(data.action){
      if(data.action=='SCENES'){
        setScenes(data.scenes);
      }
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
        id:sceneID,
        sceneName:sceneName,
        description:description
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
          ? {...item,name:data.scene.name,description:data.scene.description}
          : item
      ));
      }
    }
  }

  function typeName(e){
    setSceneName(e.target.value);
  }

  function typeDesription(e){
    setDescription(e.target.value);
  }

  function editSceneID(id){
    setSceneID(id);
    for(const scene of scenes){
      if(scene.id == id){
        setSceneName(scene.name);
        setDescription(scene.description);
        break;
      }
    }
  }
  
  return (<>
  <div>
    <div>
      <label>Scenes</label> <button onClick={()=>createScene()}>Create</button><input value={sceneName} onChange={typeName}></input> <input value={description} onChange={typeDesription}></input><button onClick={updateNameScene}> Update </button> <label>ID: {sceneID}</label>
    </div>
    {scenes.map((item)=>{
      return(<div key={item.id}>
        <button onClick={()=>deleteScene(item.id)}>Delete</button>  <label>[ID: {item.id}] [Name:] {item.name} </label> 
        <button onClick={()=>editSceneID(item.id)}>Select Edit</button>
        <button onClick={()=>ops({action:'loadscene',id:item.id})}>Load</button>
      </div>);
    })}
    
  </div>
  </>);
}