/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useEffect, useState } from 'react';
import styles from "./dropdown.module.css";

export default function Component(props) {
  
  const [menuName, setMenuName] = useState(false)

  useEffect(async () => {
    console.log("init menu drop down.")
    if(!props.menuname){
      //props.menuname="test";
      setMenuName("test");
    }else{
      setMenuName(props.menuname);
    }
  }, []);
  
  return (<>
    <div className={styles.dropdown}>
    <button className={styles.dropbtn}>{menuName} 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className={styles.dropdowncontent}>
      {/*
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
      */}
      {props.children}
    </div>
    
  </div> 
  </>);
}