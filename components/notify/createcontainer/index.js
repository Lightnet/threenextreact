/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/38093760/how-to-access-a-dom-element-in-react-what-is-the-equilvalent-of-document-getele

// notify/createContainer/index.js
import { useEffect, useState } from "react";
import styles from "./container.module.css";

export default function CreateContainer({ref,children}) {
  const portalId = "notifyContainer";
  const [portalID,setPortalID] = useState('notifyContainer');
  //let element;// = document.getElementById(portalId);
  //const [divElement, setElement] = useState(null);

  return (<div ref={ref} id={portalID} className={styles.container}>
    {children}
  </div>);
}

/*
export default function createContainer() {
  const portalId = "notifyContainer";
  let element;

  useEffect(()=>{
    element = document.getElementById(portalId);
  },[element]);

  if (element) {
    return element;
  }

  element = document.createElement("div");
  element.setAttribute("id", portalId);
  element.className = styles.container;
  document.body.appendChild(element);
  return element;
}
*/