/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import NumberProp from "../input/propnumber";

export default function Component({selectObject,ops}) {
  const [objID, setObjID] = useState(null);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [posZ, setPosZ] = useState(0);

  const [showPanel, setShowPanel] = useState(true);

  useEffect(()=>{
    if(selectObject){
      if(selectObject.objectid){
        setObjID(selectObject.objectid);
      }
      if(selectObject.position){
        setPosX(selectObject.position[0]);
      }
      if(selectObject.position){
        setPosY(selectObject.position[1]);
      }
      if(selectObject.position){
        setPosZ(selectObject.position[2]);
      }
    }
  });

  function togglePanel(){
    setShowPanel(state=>!state);
  }

  return (<>
    <div>
      <div className="headerpanel">
      <button onClick={togglePanel}>{showPanel?("-"):("+")}</button><label>Position:</label>
      </div>
      {showPanel &&
      <div>
        <div className="contentpanel">
          <label>X:
          <NumberProp 
              ops={ops}
              objid={objID}
              objKey="positionX"
              value={posX}
              objtype="object3d"
              ></NumberProp>
          </label>
        </div>
        <div className="contentpanel">
          <label>Y:
          <NumberProp 
              ops={ops}
              objid={objID}
              objKey="positionY"
              value={posY} 
              objtype="object3d"
              ></NumberProp>
          </label>
        </div>
        <div className="contentpanel">
          <label>Z:
          <NumberProp 
              ops={ops}
              objid={objID}
              objKey="positionZ"
              value={posZ} 
              objtype="object3d"
              ></NumberProp>
          </label>
        </div>
      </div>}

    </div>
  </>);
}