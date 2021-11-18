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

  useEffect(()=>{
    if(selectObject){
      if(selectObject.id){
        setObjID(selectObject.id);
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

  return (<>
    <div>
      <div>
        <label>Position:</label>
      </div>
      <div>
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

      <div>
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

      <div>
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

    </div>
  </>);
}