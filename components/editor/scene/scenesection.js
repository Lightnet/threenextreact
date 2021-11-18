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
  
  return (<>
  <div>
    <div>
      <label>Scenes</label> <button onClick={()=>createScene()}>Create</button>
    </div>
    {scenes.map((item)=>{
      return(<div key={item.id}>
        <button onClick={()=>deleteScene(item.id)}>Delete</button> <label>[ID: {item.id}] {item.name} </label> 
        <button onClick={()=>ops({action:'loadscene',id:item.id})}>Load</button>
      </div>);
    })}
    
  </div>
  </>);
}