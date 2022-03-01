/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.w3schools.com/howto/howto_custom_select.asp
// https://stackoverflow.com/questions/1895476/how-do-i-style-a-select-dropdown-with-only-css
// https://www.javatpoint.com/html-list-box

import React, { useEffect, useState } from "react";

export default function Select({children}){

  return <select className="Select" size={1}>
    {children}
  </select>
}