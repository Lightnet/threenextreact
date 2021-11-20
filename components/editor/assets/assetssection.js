/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import useFetch from "../../hook/usefetch";

export default function AssetsSection({editorid}) {
  const [assets, setAssets] = useState([])
  const [editorID, setEditorID] = useState(null)
  
  useEffect(() => {
    if(editorid){
      setEditorID(editorid);
      //getAssets();
    }
  },[editorid]);

  async function getAssets(){
    if(!editorID){
      console.log('editorid NULL');
      return;
    }
    let data = await useFetch('api/assets',{
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

  async function createAsset(){
    if(!editorID){
      console.log('editorid NULL');
      return;
    }
    let data = await useFetch('api/assets',{
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

  async function deleteAsset(id){
    if(!editorID){
      console.log('editorid NULL');
      return;
    }
    let data = await useFetch('api/assets',{
      method:'DELETE'
      , body:JSON.stringify({action:'SCENES',id:id})
    });
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH DELETE ASSET');
    }
    if(data.action){
      if(data.action=='SCENES'){
        setScenes(data.scenes);
      }
    }
  }
  
  return (<>
  <div>
    <div>
      <label>Assets:</label>
    </div>
    <div>
      {assets.map((item)=>{
        return (<>
          <div key={item.id}>
            <label>[ID:{item.id}] <button onClick={()=>deleteAsset(item.id)}></button> </label>
            <label>Name:{item.name}</label>
          </div>
        
        </>);
      })}
    </div>
  </div>
  </>);
}