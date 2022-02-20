/*
  LICENSE: MIT
  Created by: Lightnet
*/


import React,{ useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helper";
import { useEditor, useScene } from "../context/editorprovider";

export default function PropOutliner({object3ds,ops}) {

  const {sceneID, setSceneID} = useScene();
  const {
    sceneName, setSceneName,
    object3Ds, setObject3Ds
  } = useEditor();
  //const [object3Ds, setObject3Ds] = useState([]);

  const [object3DID, setObject3DID] = useState('');
  const [objectMame, setObjectName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [isShowSceneID, setIsShowSceneID] = useState(false);

  //useEffect(() => {
    //console.log("objectscene sceneID:",sceneID);
  //}, [sceneID]);

  function toggleDisplaySceneID(){
    setIsShowSceneID(state=>!state);
  }

  function btnEdit(id){
    for(const obj3d of object3Ds){
      if(obj3d.objectid == id){
        setObjectName(obj3d.name)
        break;
      }
    }
    setObject3DID(id);
    setIsEdit(!isEdit)
  }

  function onChangeObjectName(e){
    setObjectName(e.target.value);
  }

  function inputKeyObject3DName(event){
    if (event.keyCode === 13) {
      //check for string empty
      if(isEmpty(event.target.value)){
        console.log("Empty!");
        return;
      }
      console.log(typeof ops);
      //check for function exist
      if(typeof ops !== 'undefined'){
        ops({
          action:"rename",
          id:object3DID,
          name:objectMame
        });
      }
      setIsEdit(false);
    }
  }

  function renderSceneObjects(){
    if (object3Ds){
      //return <label>Found</label>
      return object3Ds?.map((_entity)=>{
        return (
          <div key={_entity.objectid}>
            {(isEdit==true && object3DID== _entity.objectid)? (
              <input value={objectMame} onChange={onChangeObjectName} onKeyUp={inputKeyObject3DName}></input>
            ):(
              <label> Name:{_entity?.name} </label>
            )}
            
            <img src="/icon/delete01.svg" className="imgicon" width="16" height="16" onClick={()=>ops({action:"remove",id:_entity.objectid})} style={{float:'right'}}/>
            <img src="/icon/visibleeye01.svg" className="imgicon" width="16" height="16" onClick={()=>ops({action:"visible",id:_entity.objectid})} style={{float:'right'}}/>
            <img src="/icon/select01.svg" className="imgicon" width="16" height="16" onClick={()=>ops({action:"select",id:_entity.objectid})} style={{float:'right'}}/>
            <img src="/icon/edit01.svg" className="imgicon" width="16" height="16" onClick={()=>btnEdit(_entity.objectid)} style={{float:'right'}} />
                        
          </div>
        )
      })
    }
    return <div><label>Empty</label></div>
  }

  return (<>
    <div>
      {isShowSceneID && <><label>ID: {sceneID}</label><br /></>}
      <label onClick={toggleDisplaySceneID}>Scene: {sceneName}</label>
    </div>
    <div>
      <label>Object3Ds:</label>
    </div>
    <div>
      {renderSceneObjects()}
    </div>
  </>);
}