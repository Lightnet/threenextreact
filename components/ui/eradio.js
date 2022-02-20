/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.w3schools.com/tags/att_input_type_radio.asp

import React,{ useState, useEffect } from "react";

export default function ERadio() {
  
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => { 

  }, []);
  
  return (<>
    <input type="radio" />
  </>);
}