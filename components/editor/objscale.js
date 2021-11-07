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
        <label>Scale</label>
      </div>
      <div>
        <label>X:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="scaleX"
            type="mesh"
          />
        </label>
      </div>

      <div>
        <label>Y:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="scaleY"
            type="mesh"
          />
        </label>
      </div>

      <div>
        <label>Z:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="scaleZ"
            type="mesh"
          />
        </label>
      </div>

    </div>
  </>);
}