/*
  LICENSE: MIT
  Created by: Lightnet
*/

import PropNumber from "../input/propnumber";
import { useEditor } from "../context/editorprovider";
import React,{ useState, useEffect } from "react";

export default function PropPlane({ops}) {

  const {selectObject} = useEditor();

  const [width,setWidth] = useState(0);
  const [widthSegments,setWidthSegments] = useState(0);
  const [height,setHeight] = useState(0);
  const [heightSegments,setHeightSegments] = useState(0);

  useEffect(() => {
    if(selectObject){
      setWidth(selectObject.parameters.width);
      setWidthSegments(selectObject.parameters.widthSegments);
      setHeight(selectObject.parameters.height);
      setHeightSegments(selectObject.parameters.heightSegments);
    }
    
    return () => {
    }
  })

  function updateParams(arg){
    console.log(arg);
    let parameters = selectObject.parameters;
    if(arg.objkey=='width'){
      parameters.width = arg.setValue;
    }
    if(arg.objkey=='height'){
      parameters.height = arg.setValue;
    }

    if(arg.objkey=='widthSegments'){
      parameters.widthSegments = arg.setValue;
    }
    if(arg.objkey=='heightSegments'){
      parameters.heightSegments = arg.setValue;
    }
    
    ops({
      action:"update"
      , id: selectObject.objectid
      , objtype: "plane"
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
        <label> Width: 
          <PropNumber
            ops={updateParams}
            objKey="width"
            objtype="plane"
            value={width}
        ></PropNumber></label>
      </div>
      <div>
        <label> Height: 
          <PropNumber
            ops={updateParams}
            objKey="height"
            value={height}
            objtype="plane"
        ></PropNumber></label>
      </div>

      <div>
        <label> Width Segments: 
          <PropNumber
            ops={updateParams}
            objKey="widthSegments"
            value={widthSegments}
            objtype="plane"
        ></PropNumber></label>
      </div>

      <div>
        <label> Height Segments: 
          <PropNumber
            ops={updateParams}
            objKey="heightSegments"
            value={heightSegments}
            objtype="plane"
        ></PropNumber></label>
      </div>

    </div>
  </>);
}