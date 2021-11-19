/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from "react";

export default function ECheckBox({}) {

  const [isCheckBox, setIsCheckBox] = useState(false);
  
  useEffect(() => { 

  }, []);

  function clickChange(e){
    console.log("change?",e.target.value)
  }
  
  return (<>
    <input onChange={clickChange} type="checkbox" name="test" value="hello" />
  </>);
}