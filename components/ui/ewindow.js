/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable

import { useRef, useEffect, useState, Children } from 'react';

import styles from "./ewindow.module.css";

export default function EWindow({props,title,children}) {

  const [relX, setrelX] = useState(0)
  const [relY, setrelY] = useState(0)

  const [posX, setPosX] = useState(10)
  const [posY, setPosY] = useState(0)
  const [isPress, setIsPress] = useState(false)
  const [isDrag, setIsDrag] = useState(true)
  const [isAutoSize, setIsAutoSize] = useState(false)

  const [height, setHeight] = useState(200)
  const [width, setWidth] = useState(250)

  const [titleName, setTitle] = useState('')

  const ref = useRef();

  useEffect(() => { 
    if(title){
      setTitle(title);
    }else{
      setTitle('Window');
    }
  }, [title]);
  
  
  function dragMouseDown(e) {
    if(!isDrag){
      return;
    }
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
    if(!isDrag){
      return;
    }
    if (isPress) {
      //console.log("move?");
      e = e || window.event;
      e.preventDefault();
      setPosX(e.pageX - relX);
      setPosY(e.pageY - relY);
    }
  }

  function OnMouseUp() {
    if(!isDrag){
      return;
    }
    // stop moving when mouse button is released:
    setIsPress(false);
  }

  function closeWindow(){
    console.log('close')
  }

  //https://developer.mozilla.org/en-US/docs/Web/CSS/height
  const style = {height:height,width:width,left:posX+'px',top:posY+'px'};
  
  return (<>
    <div ref={ref} className={styles.eWindow} style={style}>
      <div className={styles.header} 
        onMouseDown={dragMouseDown}
        onMouseMove={OnMouseMove}
        onMouseUp={OnMouseUp}
        >
          {titleName}
          <a href="#" onClick={closeWindow} style={{float:'right',textDecoration:'none'}}>X</a>
        </div>
      <div>
        {children}
      </div>
    </div>
  </>);
}
/*

*/