/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
//import { useEditor } from "../context/editorprovider";
import PropNumber from "../input/propnumber";

export default function PropPhysics({selectObject,ops}) {
  //const [isCheck,setIsCheck] = useState(false);
  //const {selectObject, setSelectObject} = useEditor();
  const [isPhysics, setIsPhysics] = useState(false);
  const [objectID, setObjectID] = useState(null)
  const [mass,setMass] = useState(0);

  useEffect(()=>{
    console.log(selectObject);
    //if(!selectObject){
      //return;
    //}
    console.log(selectObject.isPhysics);
    if(selectObject){
      console.log("change var???")
      setIsPhysics(selectObject.isPhysics);
      setObjectID(selectObject.objectid);
      setMass(selectObject.mass);
      console.log("isPhysics: ",selectObject.isPhysics)
      console.log("mass: ",selectObject.mass)
    }
    return ()=>{
      console.log('clean up')
      //setIsPhysics(false);
      //setObjectID(null);
      setMass(0);
    }
  })

  function onChangePhysics(e){
    console.log("change...", e.target.checked);
    //setIsPhysics(e.target.checked);
    ops({
      action:"update"
      , id: objectID
      , objtype: "physics"
      , objkey: "isPhysics"
      , setValue: e.target.checked
    });
  }

  return (<>
    <div>
      <div className="headerpanel">
        <input type="checkbox" checked={isPhysics} onChange={onChangePhysics} /> <label> Is Physics </label>
      </div>
      <div className="contentpanel">
        <label>Mass:</label> 
        <PropNumber
          ops={ops}
          objid={objectID}
          objKey="mass"
          value={mass}
          objtype="physics"
        ></PropNumber>
      </div>
    </div>
  </>);
}