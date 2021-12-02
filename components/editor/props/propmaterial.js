/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState } from "react";
import { useEditor } from "../context/editorprovider";
import PropMeshStandardMaterial from "./propmeshstandardmaterial";

var materialtypes=[
  'meshStandardMaterial'
  , 'lineBasicMaterial'
];

export default function PropMaterial({ops}) {

  const {selectObject} = useEditor();

  const [materialName, setMaterialName] = useState('');

  function onChangeMaterial(e){
    console.log(e.target.value)
    setMaterialName(e.target.value)
  }

  //need update and fix?
  function updateOPS(args){
    ops(args)
  }

  function renderMaterial(){
    if(selectObject){
      if(selectObject.material){
        //console.log(selectObject.material)
        return (<>
        {selectObject.material.map((item,index)=>{
          console.log("sadfsdfsdfsdf");
          console.log(item);
          return <PropMeshStandardMaterial key={index} item={item} ops={updateOPS}/>
          //return (<div key={index}><label>Type:{item.datatype} </label><label>Name:{item.name} </label></div>);
        })}
        </>)
        //return <label > Test </label>

      }else{
        return (<>
          <button onClick={createMaterial}>Create</button> 
          <select value={materialName} onChange={onChangeMaterial}>
            {materialtypes.map((item,index)=>{
              return <option key={index} value={item}> {item} </option>
            })}
            
          </select>
        </>)
      }
    }
    return <></>
  }

  function createMaterial(){
    console.log('CREATE MATERIAL');
    let material = {
      datatype:materialName
      , name: materialName
      , color: 'green'
      , wireframe: false
    }

    ops({
      action:"update"
      , id: selectObject.objectid
      , objtype: "box"
      , objkey: 'material'
      , setValue: material
    });
  }

  return (<>
    <div>
      <div>
        <label>Material(s):</label>
      </div>
      <div>
        {renderMaterial()}
      </div>
    </div>
  </>);
}