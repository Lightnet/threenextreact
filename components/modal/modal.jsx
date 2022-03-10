/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable

import React,{ useRef, useEffect, useState } from 'react';
import styles from "./modal.module.css";

export default function Modal({children,title,isOpen,pos,pheight,pwidth,onClose,updatePos,resize,isdrag}) {

  const [isModal, setIsModal] = useState(false)

  const [relX, setrelX] = useState(0)
  const [relY, setrelY] = useState(0)

  const [posX, setPosX] = useState(10)
  const [posY, setPosY] = useState(0)
  const [isPress, setIsPress] = useState(false)
  const [isAutoSize, setIsAutoSize] = useState(false)
  const [reSize, setReSize] = useState(false)
  const [isDrag, setIsDrag] = useState(true)

  const [height, setHeight] = useState(200)
  const [width, setWidth] = useState(250)

  const [titleName, setTitle] = useState('')

  const ref = useRef();

  useEffect(()=>{
    if(typeof resize !='undefined'){
      setReSize(resize);
    }
  },[resize])

  useEffect(() => { 
    //log("isOpen: ", isOpen)
    if(typeof isOpen !='undefined'){
      setIsModal(isOpen);
    }
  }, [isOpen]);

  useEffect(() => { 
    if(title){
      setTitle(title);
    }else{
      setTitle('Window');
    }
    if(pos){
      //log(pos);
      setPosX(pos[0]);
      setPosY(pos[1]);
    }
    if(pheight){
      setHeight(parseFloat(pheight))
    }
    if(pwidth){
      setWidth(parseFloat(pwidth))
    }
  }, [title,pos,pheight,pwidth]);

  useEffect(()=>{
    if(typeof isdrag != "undefined"){
      setIsDrag(isdrag)
    }
  },[isdrag])

  
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
      //log("move?");
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

  function closeEWindow(e){
    e.preventDefault();
    //log('close');
    if(typeof onClose !== 'undefined'){
      if(typeof updatePos !== 'undefined'){
        updatePos([posX,posY]);
      }
      onClose();
    }
  }

  //https://developer.mozilla.org/en-US/docs/Web/CSS/height
  //const style = {height:height,width:width,left:posX+'px',top:posY+'px'};
  let style = {
    left:posX+'px'
    ,top:posY+'px'
  };

  if(height){style.height=height;}
  if(width){style.width=width;}
  if(reSize){
    style.border="1px solid";
    style.resize="both";
    style.overflow="auto";
  }else{
    //style.border="initial";
    style.border="1px solid";
    style.resize="none";
    style.overflow="visible";
  }
  
  if(isModal==false){
    return <></>
  }

  return (<>
    <div ref={ref} className={styles.modal} style={style}>
      <div 
        className={styles.modalHeader} 
        onMouseDown={dragMouseDown}
        onMouseMove={OnMouseMove}
        onMouseUp={OnMouseUp}
        >
          {titleName}
          <a href="#" onClick={closeEWindow} style={{float:'right',textDecoration:'none'}}>X</a>
        </div>
      <div>
        {children}
      </div>
    </div>
  </>);
}
/*
<Button> Test</Button>
*/