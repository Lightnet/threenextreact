/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react'
//import { Button } from 'semantic-ui-react';

export default function Child({childToParent}) {
    const data = "This is data from Child Component to the Parent Component."
    return (
      <div>
          <button primary onClick={() => childToParent(data)}>Click Child</button>
      </div>
    )
}