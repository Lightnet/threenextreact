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
        <label>Transform</label>
      </div>
      <div>
        <label>X:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="positionX"
            type="mesh"
          />
        </label>
      </div>

      <div>
        <label>Y:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="positionY"
            type="mesh"
          />
        </label>
      </div>

      <div>
        <label>Z:
          <InputProp 
            selectObject={selectObject}
            ops={ops}
            objKey="positionZ"
            type="mesh"
          />
        </label>
      </div>

    </div>
  </>);
}