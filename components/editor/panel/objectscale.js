/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import PropNumber from "../input/propnumber";

export default function Component({selectObject,ops}) {

  const [objID, setObjID] = useState(null);
  const [scaleX, setScaleX] = useState(0);
  const [scaleY, setScaleY] = useState(0);
  const [scaleZ, setScaleZ] = useState(0);

  useEffect(()=>{
    if(selectObject){
      if(selectObject.id){
        setObjID(selectObject.id);
      }
      if(selectObject.scale){
        setScaleX(selectObject.scale[0]);
      }
      if(selectObject.scale){
        setScaleY(selectObject.scale[1]);
      }
      if(selectObject.scale){
        setScaleZ(selectObject.scale[2]);
      }
    }
  });

  return (<>
    <div>
      <div>
        <label>Scale:</label>
      </div>
      <div>
        <label>X:
          <PropNumber 
            ops={ops}
            objid={objID}
            objKey="scaleX"
            value={scaleX} 
            objtype="object3d"
            ></PropNumber>
        </label>
      </div>

      <div>
        <label>Y:
          <PropNumber 
            ops={ops}
            objid={objID}
            objKey="scaleY"
            value={scaleY} 
            objtype="object3d"
            ></PropNumber>
        </label>
      </div>

      <div>
        <label>Z:
          <PropNumber 
            ops={ops}
            objid={objID}
            objKey="scaleZ"
            value={scaleZ} 
            objtype="object3d"
            ></PropNumber>
        </label>
      </div>

    </div>
  </>);
}