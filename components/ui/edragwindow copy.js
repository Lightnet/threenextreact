/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';

import styles from "./draggable.module.css";

export default function Component() {

  const [pos1, setPos1] = useState(0)
  const [pos2, setPos2] = useState(0)
  const [pos3, setPos3] = useState(0)
  const [pos4, setPos4] = useState(0)

  const [relX, setrelX] = useState(0)
  const [relY, setrelY] = useState(0)

  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)

  const refel = useRef();

  /*
  useEffect(async () => { 
  }, []);
  */
  var self = this;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    //setPos3(e.clientX);
    //setPos4(e.clientY);
    //console.log(e.clientX);
    //console.log(e.clientY);
    //document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    //document.onmousemove = elementDrag;

    //const {scrollLeft, scrollTop, clientLeft, clientTop} = document.body;
    //const {left, top} = refel.current.getBoundingClientRect();
    //setrelX(e.pageX - (left + scrollLeft - clientLeft));
    //setrelY(e.pageY - (top + scrollTop - clientTop));

    //document.addEventListener('mousemove', elementDrag)
    //document.addEventListener('mouseup', closeDragElement)
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    //setPos1(e.clientX - pos3);
    //setPos2(e.clientY - pos4);
    //setPos3(e.clientX);
    //setPos4(e.clientY);
    // set the element's new position:
    //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    //elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    setPosX(e.pageX - setrelX);
    setPosY(e.pageY - setrelY);
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    //document.onmouseup = null;
    //document.onmousemove = null;

    document.removeEventListener('mousemove', elementDrag)
    document.removeEventListener('mouseup', closeDragElement)
  }


  return (<>
    <div ref={refel} className={styles.dwindow} style={{left:posX+'px',top:posY+'px' }}>
      <div className={styles.header} onMouseDown={dragMouseDown}
        >Click here to move</div>
      <p>Move</p>
      <p>this</p>
      <p>DIV</p>
    </div>
  </>);
}