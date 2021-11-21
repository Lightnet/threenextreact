/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This will have some module for creating view type.
  Example for blender3d ui. Coding will be hard.

*/

import { useState } from "react";

export default function ViewPanel() {

  const [view, setView] = useState('');

  function onChangeView(e){
    console.log(e.target.value);
    setView(e.target.value);
  }

  function renderView(){

    if(view==''){
      return (<></>);  
    }

    return (<></>);
  }

  return (<>
    <div>
      <div>
        <label>View: </label>
        <select value={view} onChange={onChangeView}>
          <option disabled value=''> Select </option>
          <option value="scene"> Scene </option>
          <option value="props"> Props </option>
          <option value="projects"> Projects </option>
          <option value="assets"> Assets </option>
          <option value="objectdata"> ObjectData </option>
        </select>
      </div>
      <div>
        {renderView()}
      </div>
    </div>
  </>);
}
