/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from "react";

export default function ELabel({text,children}) {
  
  const [textfield, setTextField] = useState("");

  useEffect(() => { 
    if(text){
      setTextField(text);
    }
  }, [text]);
  
  return (<>
    <label>{textfield}</label>
  </>);
}