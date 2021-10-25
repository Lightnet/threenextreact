/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://lo-victoria.com/a-look-at-react-hooks-usestate
// https://www.falldowngoboone.com/blog/talk-to-your-react-components-with-custom-events/

// <Modal isOpen={isOpen} onRequestClose={closeModal}>
import React, {useState, useEffect} from "react";

export default function Component({isOpen,onRequestClose}) {
  const [SBHeight, setSBHeight] = useState(32);

  useEffect(async () => { 
    console.log("Top Side Bar is open?");
    if(isOpen){
      setSBHeight(32);
    }else{
      setSBHeight(0);
    }
    return ()=>{
      console.log("clean Side bar?");
    }
  }, [isOpen]);

  return (<>
    <div id="editorTopSideBar" className="tSideBar" 
      style={{height:SBHeight+"px"}}
      >
      <a href="#" className="closebtn" onClick={(e)=>onRequestClose(e)}>×</a>
      <a href="#">{SBHeight}</a>
      <a href="#">Add Cube</a>
      <a href="#">Add Sphere</a>
      <a href="#">Add Plane</a>
      <a href="#">Add Camera</a>
      <a href="#">Add Light</a>
    </div>
  </>);
}