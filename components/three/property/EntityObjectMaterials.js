/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react"
import { isEmpty } from "../../../lib/helper.mjs";
import { useEntity } from "../context/EntityProvider.js";

export default function EntityObjectMaterials({selectobject}){

  const {
    entities
  , dispatchEntity
} = useEntity()

  const [selectObject, setSelectObject] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState(null);
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(()=>{
    console.log("material check...")
    if(!selectobject){
      setMaterials([])
      setMaterial({})
      return;
    }
    if(!selectobject.material){
      setMaterials([])
      setMaterial(null)
      return;
    }
    setSelectObject(selectobject);
    if(selectobject.material){
      setMaterials(selectobject.material)
      setMaterial(selectobject.material[0])
    }
  },[selectobject])

  useEffect(()=>{
    if(material){
      dispatchEntity({
          type:"update"
        , id: selectObject.objectid
        , keyType: "material"
        , value: material
      })
    }
  },[material])

  function handleChange(evt) {
    const value = evt.target.value;
    //console.log(evt.target.type)
    //const name = evt.target.name;
    if(evt.target.type=="number"){
      setMaterial(state => ({...state, [evt.target.name]: Number(value)}));
    }
    if(evt.target.type=="checkbox"){
      //console.log("evt.target.checked");
      //console.log(evt.target.checked);
      setMaterial(state => ({...state, [evt.target.name]: Boolean(evt.target.checked)}));
    }
    if(evt.target.type=="color"){
      //console.log(value);
      setMaterial(state => ({...state, [evt.target.name]: value}));
    }
  }

  function renderMaterials(){
    if(material){
      return Object.keys(material).reduce(function(result, key) {
        //console.log("Type:", typeof parameters[key], key)
        let type="text";
        let item;
        if(typeof material[key] == "number"){
          //console.log("number////////")
          type="number";
        }else if(typeof material[key] == "boolean"){
          //console.log("boolean////////")
          type="checkbox";
          item = <tr key={key}>
          <td><label> {key} </label> </td>
          <td><input name={key} type={type} value={material[key]} checked={material[key]}  onChange={handleChange}/></td>
          </tr>
          return [ ...result,item]
        }
        //added last as it didn't detect as color unit
        if(key=="color"){
          //console.log("color////////")
          type="color";
        }
        item = <tr key={key}>
          <td><label> {key} </label> </td>
          <td><input name={key} type={type} value={material[key]} onChange={handleChange}/></td>
          </tr>
  
        return [ ...result,item]
      }, [])
    }
    return <></>
  }

  return <>
    {material &&
     <div>
      <div>
        <label> Materials: </label><button onClick={()=>setIsDisplay(state=>!state)}> {isDisplay ? ("+"):("-")} </button>
      </div>
      {isDisplay &&
      <div>
        <table>
          <tbody>
            {renderMaterials()}
          </tbody>
        </table>
      </div>}
    </div>}
  </>
}