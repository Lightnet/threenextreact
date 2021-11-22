/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useEditor } from "../context/editorprovider";
import { useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helper";

export default function PropObject3Ds({ops}) {

  const {object3Ds, setObject3Ds} = useEditor();

  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editID, setEditID] = useState('');

  function btnEdit(id){
    for(const obj3d of object3Ds){
      if(obj3d.id == id){
        setEditName(obj3d.name)
        break;
      }
    }
    setEditID(id);
    setIsEdit(!isEdit)
  }

  function onChangeEditName(e){
    setEditName(e.target.value);
  }

  function inputKeyEditName(event){
    if (event.keyCode === 13) {
      //check for string empty
      if(isEmpty(event.target.value)){
        console.log("Empty!");
        return;
      }
      //console.log(typeof ops);
      //check for function exist
      setIsEdit(false);
    }
  }


  function renderObject3Ds(){
    if(object3Ds){
      return object3Ds?.map((entity)=>{
        return (
          <div key={entity.id}>
            {(isEdit==true && editID== entity.id)? (
              <input value={editName} onChange={onChangeEditName} onKeyUp={inputKeyEditName}></input>
            ):(
              <label> Name:{entity?.name} </label>
            )}
            <img src="/icon/edit01.svg" className="imgicon" width="16" height="16" onClick={()=>btnEdit(entity.id)} />
            <img src="/icon/select01.svg" className="imgicon" width="16" height="16" onClick={()=>ops({action:"select",id:entity.id})} />
            <img src="/icon/visibleeye01.svg" className="imgicon" width="16" height="16" onClick={()=>ops({action:"visible",id:entity.id})} />
          </div>
        )
      })
    }
    return <></>
  }

  return (<>
    <div>
      <div>
        <label>Prop Object3Ds:</label>
      </div>
      <div>
        {renderObject3Ds()}
      </div>
    </div>
  </>);
}