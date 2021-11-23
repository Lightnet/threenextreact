/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { useEffect, useState } from "react";
import PropNumber from "../input/propnumber";

export default function Component({selectObject,ops}) {

  const [objID, setObjID] = useState(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);

  useEffect(()=>{
    if(selectObject){
      if(selectObject.id){
        setObjID(selectObject.id);
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

  return (<>
    <div>
      <div className="headerpanel">
        <label>Rotation:</label>
      </div>
      <div className="contentpanel">
        <label>X:
        <PropNumber 
            ops={ops}
            objid={objID}
            objKey="rotationX"
            value={rotX} 
            objtype="object3d"
            ></PropNumber>
        </label>
      </div>

      <div className="contentpanel">
        <label>Y:
          <PropNumber 
            ops={ops}
            objid={objID}
            objKey="rotationY"
            value={rotY} 
            objtype="object3d"
            ></PropNumber>
        </label>
      </div>

      <div className="contentpanel">
        <label>Z:
          <PropNumber 
            ops={ops}
            objid={objID}
            objKey="rotationY"
            value={rotZ} 
            objtype="object3d"
            ></PropNumber>
        </label>
      </div>

    </div>
  </>);
}