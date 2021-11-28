/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This will have some module for creating view type.
  Example for blender3d ui. Coding will be hard.

*/

import { useEffect, useState } from "react";

import PropScene from "../scene/propscene";
import PropScenes from "../scene/propscenes";
import PropObject3Ds from "../object/propobject3ds";

import PropObjectData from "../assets/propobjectdata";
import PropObject from "../object/propobject";
//import ViewScene from "../scene/viewscene";
import PropNode from "../node/propnode";
import PropOutliner from "../props/propoutliner";

export default function ViewPanel({currentView,ops}) {

  const [view, setView] = useState('');

  useEffect(()=>{
    if(currentView){
      setView(currentView);
    }
  },[currentView])

  function onChangeView(e){
    console.log(e.target.value);
    setView(e.target.value);
  }

  function renderView(){
    if(view=='outliner'){
      return <PropOutliner ops={ops} />
    }
    if(view=='scene'){
      return <PropScene ops={ops}></PropScene>
    }
    if(view=='scenes'){
      return <PropScenes ops={ops}></PropScenes>
    }
    if(view=='object3ds'){
      return <PropObject3Ds ops={ops}></PropObject3Ds>
    }
    if(view=='props'){
      return <PropObject ops={ops}></PropObject>
    }
    if(view=='objectdatas'){
      return <PropObjectData ops={ops}></PropObjectData>
    }
    if(view=='projects'){
      return <></>
    }
    if(view=='node'){
      return <PropNode></PropNode>
    }

    return (<></>);
  }

  return (<>
    <div>
      <div>
        <label>View: </label>
        <select value={view} onChange={onChangeView}>
          <option disabled value=''> Select </option>
          <option value="outliner"> Outliner </option>
          <option value="scene"> Scene </option>
          <option value="scenes"> Scenes </option>
          <option value="object3ds"> Object3Ds </option>
          <option value="props"> Props </option>
          <option value="projects"> Projects </option>
          <option value="assets"> Assets </option>
          <option value="objectdatas"> Object Datas </option>
          <option value="node"> node </option>
          <option value="texteditor"> Text Editor </option>
        </select>
      </div>
      <div>
        {renderView()}
      </div>
    </div>
  </>);
}
