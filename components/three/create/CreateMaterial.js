/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useState } from "react";
import { nanoid32 } from "../../../lib/helper.mjs";
import { useEditor } from "../context/EditorProvider";
import { useEntity } from "../context/EntityProvider";

var materialtypes=[
  'meshStandardMaterial'
  , 'lineBasicMaterial'
];

export default function CreateMaterial({onClose}){

  const {
      selectObjectID
    , setSelectObjectID
  } = useEditor();

  const {
    sceneID
  , entities
  , dispatchEntity
  } = useEntity();

  const [materialName, setMaterialName] = useState('meshStandardMaterial');
  const [color, setColor] = useState('#000000');
  const [wireframe, setWireFrame] = useState(false);

  function onMaterial(e){
    //console.log(e.target.value)
    setMaterialName(e.target.value)
  }

  function onWireFrame(e){
    //console.log(e.target.checked)
    setWireFrame(e.target.checked)
  }

  function onColor(e){
    //console.log(e.target.value)
    setColor(e.target.value)
  }

  function renderMaterials(){
    return (<>
      <select value={materialName} onChange={onMaterial}>
        {materialtypes.map((item,index)=>{
          return <option key={index} value={item}> {item} </option>
        })}
      </select>
    </>)
  }

  function clickCreateMaterial(){
    //console.log('CREATE MATERIAL');
    //console.log(materialName)
    let material = {
      dataType:materialName
      , index: 0
      , name: materialName
      , color: color
      , wireframe: wireframe
    }
    //console.log(material)
    /*
    dispatchEntity({
        type:'addMaterial'
      , id:selectObjectID
    })

    dispatchEntity({
      type:'update'
      , id:selectObjectID
      , keyType:"material"
      , value:material
    })
    */
    let dataEntity = entities.find(item=>item.objectid == selectObjectID)
    console.log(dataEntity);

    dataEntity.material=[]
    dataEntity.material=[
      {
          index:0
        , objectid:nanoid32()
        , dataType:"meshStandardMaterial"
        , name:"meshStandardMaterial"
        , color:"#ffffff"
        , wireframe:false
      }
    ]

    dispatchEntity({
      type:'update'
      , id:selectObjectID
      , entity:dataEntity
    })

    setSelectObjectID("");
    setSelectObjectID(selectObjectID);


    //if(onClose){
      //onClose();
    //}
  }

  return <>
    <div>
      <div>
        Material: {renderMaterials()}
      </div>
      <div>
        <label> Color: </label><input type="color" value={color} onChange={onColor} />
      </div>
      <div>
        <label> wireframe: </label> <input type="checkbox" checked={wireframe} onChange={onWireFrame} />
      </div>
      <div>
        <button onClick={clickCreateMaterial}>Create</button> 
      </div>
    </div>
  </>
}