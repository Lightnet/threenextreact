/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';
import styles from "./dropdown.module.css";

export default function Component(props) {
  
  const [menuName, setMenuName] = useState(false)

  useEffect(() => {
    //console.log("init menu drop down.");
    if(!props.menuname){
      //props.menuname="test";
      setMenuName("menu");
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
      {props.children}
    </div>
  </div> 
  </>);
}