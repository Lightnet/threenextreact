/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import {useState, useEffect} from "react";
import InputProp from "../editor/inputProp";

export default function Component({selectObject,ops}) {

  return (<>
    <div>
      <div>
        <label>Rotation</label>
      </div>
      <div>
        <label>X:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="rotationX"
            type="mesh"
          />
        </label>
      </div>

      <div>
        <label>Y:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="rotationY"
            type="mesh"
          />
        </label>
      </div>

      <div>
        <label>Z:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="rotationZ"
            type="mesh"
          />
        </label>
      </div>

    </div>
  </>);
}