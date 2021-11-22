/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useEffect, useState } from "react";
import { useEditor } from "../context/editorprovider";
import ObjectPosition from "../panel/objectposition";
import RotationProp from "../panel/objectrotation";
import ScaleProp from "../panel/objectscale";

export default function PropObject({ops}) {
  const [isObject3D, setIsObject3D] = useState(false);
  const { selectObject,setSelectObject } = useEditor();

  useEffect(()=>{

  },[])

  return (<>
    <div>
      <div>
        {selectObject && <label>Name:{selectObject?.name}</label>}
      </div>
      <div>
        {selectObject.position &&
          <ObjectPosition
            ops={ops}
            selectObject={selectObject}
            />
        }

        {selectObject.rotation &&
          <RotationProp
            ops={ops}
            selectObject={selectObject}
            />
        }

        {selectObject.scale &&
          <ScaleProp
            ops={ops}
            selectObject={selectObject}
            />
        }


      </div>
    </div>
  </>);
}