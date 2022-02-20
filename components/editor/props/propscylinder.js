/*
  LICENSE: MIT
  Created by: Lightnet
*/

import PropNumber from "../input/propnumber";
import { useEditor } from "../context/editorprovider";
import React,{ useState, useEffect } from "react";

export default function PropCylinder({ops}) {

  const {selectObject} = useEditor();

  const [radiusTop, setRadiusTop] = useState(1);
  const [radiusBottom, setRadiusBottom] = useState(1);
  const [height, setHeight] = useState(1);
  const [radialSegments, setRadialSegments] = useState(0);
  const [heightSegments, setHeightSegments] = useState(0);
  const [openEnded, setOpenEnded] = useState(0);
  const [thetaStart, setThetaStart] = useState(0);
  const [thetaLength, setThetaLength] = useState(0);


  useEffect(() => {
    if(selectObject){
      setRadiusTop(selectObject.parameters.radiusTop);
      setRadiusBottom(selectObject.parameters.radiusBottom);
      setHeight(selectObject.parameters.height);
      setRadiusTop(selectObject.parameters.radiusTop);
      setRadialSegments(selectObject.parameters.radialSegments);
      setHeightSegments(selectObject.parameters.heightSegments);
      setOpenEnded(selectObject.parameters.openEnded);
      setThetaStart(selectObject.parameters.thetaStart);
      setThetaLength(selectObject.parameters.thetaLength);
    }
    
    return () => {
    }
  })

  function updateParams(arg){
    console.log(arg);
    let parameters = selectObject.parameters;
    if(arg.objkey=='radiusTop'){
      parameters.radiusTop = arg.setValue;
    }
    if(arg.objkey=='radiusBottom'){
      parameters.radiusBottom = arg.setValue;
    }
    if(arg.objkey=='height'){
      parameters.height = arg.setValue;
    }
    if(arg.objkey=='radialSegments'){
      parameters.radialSegments = arg.setValue;
    }

    if(arg.objkey=='heightSegments'){
      parameters.heightSegments = arg.setValue;
    }
    if(arg.objkey=='openEnded'){
      parameters.openEnded = arg.setValue;
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
        <label>Cylinder:</label>
      </div>
      <div>

      <div>
        <label> radiusTop: 
          <PropNumber
            ops={updateParams}
            objKey="radiusTop"
            objtype="cylinder"
            value={radiusTop}
        ></PropNumber></label>
      </div>

      <div>
        <label> radiusBottom: 
          <PropNumber
            ops={updateParams}
            objKey="radiusBottom"
            objtype="cylinder"
            value={radiusBottom}
        ></PropNumber></label>
      </div>

      <div>
        <label> height: 
          <PropNumber
            ops={updateParams}
            objKey="height"
            objtype="cylinder"
            value={height}
        ></PropNumber></label>
      </div>

      <div>
        <label> radialSegments: 
          <PropNumber
            ops={updateParams}
            objKey="radialSegments"
            objtype="cylinder"
            value={radialSegments}
        ></PropNumber></label>
      </div>

      <div>
        <label> heightSegments: 
          <PropNumber
            ops={updateParams}
            objKey="heightSegments"
            objtype="cylinder"
            value={heightSegments}
        ></PropNumber></label>
      </div>


      <div>
        <label> thetaStart: 
          <PropNumber
            ops={updateParams}
            objKey="thetaStart"
            objtype="cylinder"
            value={thetaStart}
        ></PropNumber></label>
      </div>


      <div>
        <label> thetaLength: 
          <PropNumber
            ops={updateParams}
            objKey="thetaLength"
            objtype="cylinder"
            value={thetaLength}
        ></PropNumber></label>
      </div>



      </div>
    </div>
  </>);
}