/*
  LICENSE: MIT
  Created by: Lightnet
*/

import PropNumber from "../input/propnumber";
import { useEditor } from "../context/editorprovider";
import { useState, useEffect } from "react";

export default function PropBox({ops}) {

  const {selectObject} = useEditor();


  const [width,setWidth] = useState(0);
  const [widthSegments,setWidthSegments] = useState(0);
  const [height,setHeight] = useState(0);
  const [heightSegments,setHeightSegments] = useState(0);
  const [depth,setDepth] = useState(0);
  const [depthSegments,setDepthSegments] = useState(0);

  useEffect(() => {
    if(selectObject){
      setWidth(selectObject.parameters.width);
      setWidthSegments(selectObject.parameters.widthSegments);
      setHeight(selectObject.parameters.height);
      setHeightSegments(selectObject.parameters.heightSegments);
      setDepth(selectObject.parameters.depth);
      setDepthSegments(selectObject.parameters.depthSegments);
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

    if(arg.objkey=='depth'){
      parameters.depth = arg.setValue;
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
    
    ops({
      action:"update"
      , id: selectObject.objectid
      , objtype: "box"
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
            objtype="box"
            value={width}
        ></PropNumber></label>
      </div>
      <div>
        <label> Height: 
          <PropNumber
            ops={updateParams}
            objKey="height"
            value={height}
            objtype="box"
        ></PropNumber></label>
      </div>

      <div>
        <label> Depth: 
          <PropNumber
            ops={updateParams}
            objKey="depth"
            value={depth}
            objtype="box"
        ></PropNumber></label>
      </div>

      <div>
        <label> Width Segments: 
          <PropNumber
            ops={updateParams}
            objKey="widthSegments"
            value={widthSegments}
            objtype="box"
        ></PropNumber></label>
      </div>

      <div>
        <label> Height Segments: 
          <PropNumber
            ops={updateParams}
            objKey="heightSegments"
            value={heightSegments}
            objtype="box"
        ></PropNumber></label>
      </div>

      <div>
        <label> Depth Segments: 
          <PropNumber
            ops={updateParams}
            objKey="depthSegments"
            value={depthSegments}
            objtype="box"
        ></PropNumber></label>
      </div>


    </div>
  </>);
}