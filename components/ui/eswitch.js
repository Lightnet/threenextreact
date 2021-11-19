/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from "react";

export default function ESwitch({isswitch,updateSwitch}) {
  const [isSwitch, setIsSwitch] = useState(false);
  
  useEffect(() => { 
    setIsSwitch(isswitch);
  }, [isswitch]);

  useEffect(() => { 
    if(typeof updateSwitch !== 'undefined'){
      updateSwitch(isSwitch);
    }
  }, [isSwitch]);

  function clickSwitch(){
    setIsSwitch(!isSwitch);
  }
  
  return (<>
    <button onClick={clickSwitch}>{isSwitch?"[on]/off":"on/[off]"}</button>
  </>);
}