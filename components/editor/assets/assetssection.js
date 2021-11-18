/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import useFetch from "../../hook/usefetch";

export default function AssetsSection({editorid}) {
  const [scenes, setScenes] = useState([])
  const [editorID, setEditorID] = useState(null)
  
  useEffect(() => {
    if(editorid){
      setEditorID(editorid);
      //getScenes();
    }
  },[editorid]);

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
  
  return (<>
  <div>
    <div>
      <label>Scene</label>
    </div>
    <div>
      <label>Scene</label>
    </div>
  </div>
  </>);
}