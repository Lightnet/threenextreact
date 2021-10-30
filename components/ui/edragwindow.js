/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable

import { useRef, useEffect, useState } from 'react';

import styles from "./draggable.module.css";

export default function Component() {

  const [relX, setrelX] = useState(0)
  const [relY, setrelY] = useState(0)

  const [posX, setPosX] = useState(10)
  const [posY, setPosY] = useState(0)

  const [isPress, setIsPress] = useState(false)

  const ref = useRef();

  /*
  useEffect(async () => { 
  }, []);
  */
  
  function dragMouseDown(e) {
    if(!isPress){
      e = e || window.event;
      e.preventDefault();
      const {scrollLeft, scrollTop, clientLeft, clientTop} = document.body;
      const {left, top} = ref.current.getBoundingClientRect();
      setrelX(e.pageX - (left + scrollLeft - clientLeft));
      setrelY(e.pageY - (top + scrollTop - clientTop));
      setIsPress(true);
    }
    return false;
  }
  
  function OnMouseMove(e) {
    if (isPress) {
      //console.log("move?");
      e = e || window.event;
      e.preventDefault();
      setPosX(e.pageX - relX);
      setPosY(e.pageY - relY);
    }
  }

  function OnMouseUp() {
    // stop moving when mouse button is released:
    setIsPress(false);
  }
  
  return (<>
    <div ref={ref} className={styles.dwindow} style={{left:posX+'px',top:posY+'px'}}>
      <div className={styles.header} 
        onMouseDown={dragMouseDown}
        onMouseMove={OnMouseMove}
        onMouseUp={OnMouseUp}
        >Click here to move</div>
      <p>Move</p>
      <p>this</p>
      <p>DIV</p>
    </div>
  </>);
}
/*


*/