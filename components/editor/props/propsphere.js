/*
  LICENSE: MIT
  Created by: Lightnet
*/

import PropNumber from "../input/propnumber";
import React,{ useEditor } from "../context/editorprovider";
import { useState, useEffect } from "react";

export default function PropSphere({ops}) {

  const {selectObject} = useEditor();

  const [radius,setRadius] = useState(0);
  const [widthSegments,setWidthSegments] = useState(0);
  const [heightSegments,setHeightSegments] = useState(0);

  const [phiStart,setPhiStart] = useState(0);
  const [phiLength,setPhiLength] = useState(0);
  const [thetaStart,setThetaStart] = useState(0);
  const [thetaLength,setThetaLength] = useState(0);
  
  useEffect(() => {
    if(selectObject){
      setRadius(selectObject.parameters.radius);

      setWidthSegments(selectObject.parameters.widthSegments);
      setHeightSegments(selectObject.parameters.heightSegments);

      setPhiStart(selectObject.parameters.phiStart);
      setPhiLength(selectObject.parameters.phiLength);
      setThetaStart(selectObject.parameters.thetaStart);
      setThetaLength(selectObject.parameters.thetaLength);
    }
    
    return () => {
    }
  })

  function updateParams(arg){
    console.log(arg);
    let parameters = selectObject.parameters;
    if(arg.objkey=='radius'){
      parameters.radius = arg.setValue;
    }
    if(arg.objkey=='widthSegments'){
      parameters.widthSegments = arg.setValue;
    }
    if(arg.objkey=='heightSegments'){
      parameters.heightSegments = arg.setValue;
    }
    if(arg.objkey=='depthSegments'){
      parameters.depthSegments = arg.setValue;
    }

    if(arg.objkey=='phiStart'){
      parameters.phiStart = arg.setValue;
    }
    if(arg.objkey=='phiLength'){
      parameters.phiLength = arg.setValue;
    }
    if(arg.objkey=='thetaStart'){
      parameters.thetaStart = arg.setValue;
    }
    if(arg.objkey=='thetaLength'){
      parameters.thetaLength = arg.setValue;
    }
    
    ops({
      action:"update"
      , id: selectObject.objectid
      , objtype: "sphere"
      , objkey: 'parameters'
      , setValue: parameters
    });
    
  }

  return (<>
    <div>
      <div>
        <label>Box:</label>
      </div>
      <div>
        <label> Radius: 
          <PropNumber
            ops={updateParams}
            objKey="radius"
            objtype="sphere"
            value={radius}
        ></PropNumber></label>
      </div>

      <div>
        <label> Width Segments: 
          <PropNumber
            ops={updateParams}
            objKey="widthSegments"
            value={widthSegments}
            objtype="sphere"
        ></PropNumber></label>
      </div>

      <div>
        <label> Height Segments: 
          <PropNumber
            ops={updateParams}
            objKey="heightSegments"
            value={heightSegments}
            objtype="sphere"
        ></PropNumber></label>
      </div>

      <div>
        <label> phiStart: 
          <PropNumber
            ops={updateParams}
            objKey="phiStart"
            value={phiStart}
            objtype="sphere"
        ></PropNumber></label>
      </div>

      <div>
        <label> phiLength: 
          <PropNumber
            ops={updateParams}
            objKey="phiLength"
            value={phiLength}
            objtype="sphere"
        ></PropNumber></label>
      </div>

      <div>
        <label> thetaStart: 
          <PropNumber
            ops={updateParams}
            objKey="thetaStart"
            value={thetaStart}
            objtype="sphere"
        ></PropNumber></label>
      </div>

      <div>
        <label> thetaLength: 
          <PropNumber
            ops={updateParams}
            objKey="thetaLength"
            value={thetaLength}
            objtype="sphere"
        ></PropNumber></label>
      </div>

    </div>
  </>);
}