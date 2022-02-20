/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://discourse.threejs.org/t/degree-or-radian/21227/2

import React,{ useEffect, useState } from "react";
import PropDegree from "../input/propdegree";
import PropNumber from "../input/propnumber";

export default function Component({selectObject,ops}) {

  const [objID, setObjID] = useState(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);

  const [showPanel, setShowPanel] = useState(true);
  const [isRadian, setRadian] = useState(true);

  useEffect(()=>{
    if(selectObject){
      if(selectObject.objectid){
        setObjID(selectObject.objectid);
      }
      if(selectObject.rotation){
        setRotX(selectObject.rotation[0]);
      }
      if(selectObject.rotation){
        setRotY(selectObject.rotation[1]);
      }
      if(selectObject.rotation){
        setRotZ(selectObject.rotation[2]);
      }
    }
  });

  function togglePanel(){
    setShowPanel(state=>!state);
  }

  function toggleRadian(){
    setRadian(state=>!state);
  }

  return (<>
    <div>
      <div className="headerpanel">
      <button onClick={togglePanel}>{showPanel?("-"):("+")}</button><label>Rotation:</label>
      <button onClick={toggleRadian}>{isRadian?("Radian"):("Degree")}</button>
      </div>
      {showPanel &&
      <div>
        <div className="contentpanel">
          <label>X:
            {isRadian ? (
              <PropNumber 
                ops={ops}
                objid={objID}
                objKey="rotationX"
                value={rotX} 
                objtype="object3d"
                />
            ):(
              <PropDegree 
                ops={ops}
                objid={objID}
                objKey="rotationX"
                value={rotX} 
                objtype="object3d"
              />
            )}
          </label>
        </div>

        <div className="contentpanel">
          <label>Y:
          {isRadian ? (
            <PropNumber 
              ops={ops}
              objid={objID}
              objKey="rotationY"
              value={rotY} 
              objtype="object3d"
              />
          ):(
            <PropDegree 
              ops={ops}
              objid={objID}
              objKey="rotationY"
              value={rotY} 
              objtype="object3d"
            />
          )}
          </label>
        </div>

        <div className="contentpanel">
          <label>Z:
          {isRadian ? (
            <PropNumber 
              ops={ops}
              objid={objID}
              objKey="rotationZ"
              value={rotZ} 
              objtype="object3d"
              ></PropNumber>
          ):(
            <PropDegree 
              ops={ops}
              objid={objID}
              objKey="rotationZ"
              value={rotZ} 
              objtype="object3d"
            />
          )}
          </label>
        </div>
      </div>}
    </div>
  </>);
}