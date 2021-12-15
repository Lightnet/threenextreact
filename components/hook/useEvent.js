/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://www.w3schools.com/jsref/obj_keyboardevent.asp
// https://www.javascripttutorial.net/javascript-dom/javascript-keyboard-events/
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
// https://atomizedobjects.com/blog/javascript/develop-2d-javascript-games-html5-react/

import { useEffect } from 'react';

export default function useEvent(event, handler) {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      //console.log("clean up listener");
      window.removeEventListener(event, handler);
    };
  });
}