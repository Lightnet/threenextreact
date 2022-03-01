/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";

export default function Progress({value}){

  const [percent, setPercent] = useState(0);

  useEffect(()=>{
    setPercent(value)
  },[value])

  return <progress max="100" value={percent}/>
}