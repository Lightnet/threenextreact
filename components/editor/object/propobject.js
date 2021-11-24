/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import { useEditor } from "../context/editorprovider";
import ObjectPosition from "../panel/objectposition";
import RotationProp from "../panel/objectrotation";
import ScaleProp from "../panel/objectscale";

import { isEmpty } from "../../../lib/helper";
import PropPhysics from "./propphysics";

export default function PropObject({ops}) {
  const [isObject3D, setIsObject3D] = useState(false);
  const { 
    selectObject, setSelectObject,
    object3Ds, setObject3Ds
  
  } = useEditor();

  const [objectName, setObjectName] = useState('');
  const [objectID, setObjectID] = useState('');

  useEffect(()=>{
    if(selectObject){
      setObjectName(selectObject.name)
      setObjectID(selectObject.objectid)
    }
  },[selectObject])

  function onChangeName(e){
    setObjectName(e.target.value)
  }

  function onEnterName(e){
    //setObjectName(e.target.value)
    if(e.keyCode == 13){
      if(isEmpty(e.target.value)){
        return;
      }
      console.log("enter...")
      if(typeof ops !== 'undefined'){
        ops({
          action:"rename",
          id:objectID,
          name:objectName
        });
      }
    }
  }

  function onSelectObject3D(e){
    console.log("onSelectObject3D: ", e.target.value);
    for(const obj3d of object3Ds ){
      if(obj3d.objectid ==  e.target.value){
        setSelectObject(obj3d);
        setObjectName(obj3d.name);
        setObjectID(obj3d.objectid);
        break;
      }
    }
  }

  return (<>
    <div>
      <div className="headerpanel">
        <select onChange={onSelectObject3D} style={{width:'32px'}}>
          {object3Ds.map(item=>{
            return (<option key={item.objectid} value={item.objectid}> {item.name} </option>)
          })}
        </select>
        <input value={objectName} onChange={onChangeName} onKeyUp={onEnterName} style={{width:'158px'}}></input>
      </div>
      <div>
        {selectObject &&
          <PropPhysics
            ops={ops}
            selectObject={selectObject}
          ></PropPhysics>
        }

        {selectObject?.position &&
          <ObjectPosition
            ops={ops}
            selectObject={selectObject}
            />
        }

        {selectObject?.rotation &&
          <RotationProp
            ops={ops}
            selectObject={selectObject}
            />
        }

        {selectObject?.scale &&
          <ScaleProp
            ops={ops}
            selectObject={selectObject}
            />
        }



      </div>
    </div>
  </>);
}
/*
{selectObject && <label>Name:{selectObject?.name}</label>}

*/