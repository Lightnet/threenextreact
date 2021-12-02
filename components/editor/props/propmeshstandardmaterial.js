/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import { useEditor } from "../context/editorprovider";

export default function PropMeshStandardMaterial({item,ops}) {
  const {selectObject} = useEditor();
  const [wireframe, setWireFrame] = useState(false);
  const [color, setColor] = useState('gray');

  useEffect(()=>{
    if(item){
      if(item.color){
        setColor(item.color);
      }

      if(item.wireframe){
        setWireFrame(item.wireframe);
      }
    }
  },[item])

  function clickWireframe(e){
    console.log('click: ',e.target.checked);
    let material = item;
    if(material.wireframe==true){
      material.wireframe=false;
      setWireFrame(false);
    }else{
      material.wireframe=true;
      setWireFrame(true);
    }
    ops({
      action:'update',
      id: selectObject.objectid,
      objkey: 'material',
      setValue: material
    });
  }

  function onChangeWireFrame(e){
    console.log("e.target.checked: ",e.target.checked)
    setWireFrame(e.target.checked);
  }

  function onChangeColor(e){
    setColor(e.target.value)
  }

  function onKeyChangeColor(e){
    setColor(e.target.value)
    if(e.keyCode==13){
      console.log('color...', e.target.value)

      let material = item;

      material.color=e.target.value;

      ops({
        action:'update',
        id: selectObject.objectid,
        objkey: 'material',
        setValue: material
      });
    }
  }

  return (<div>
    <div>
      <label>Type:{item.datatype} </label>
    </div>
    <div>
      <label>Name:{item.name} </label>
    </div>

    <div>
      <label>color: <input 
      value={color} 
      onChange={onChangeColor} 
      onKeyUp={onKeyChangeColor} 
      /> </label>
    </div>

    <div>
      <label>wireframe: 
      <input type="checkbox"
      onChange={clickWireframe} 
      checked={wireframe} /> </label>
    </div>
  </div>);
}