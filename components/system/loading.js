/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://dev.to/bhagyamudgal/how-to-make-custom-loading-screen-in-next-js-project-4e90
// https://stackoverflow.com/questions/61184591/how-to-implement-loading-screen-in-next-js
import React from "react";
import styles from "./loading.module.css";
export default function Component(props) {
  /*
  useEffect(async () => { 

  }, []);
  */
  return (<>
    <div className={styles.body_loading}>
      <div className={styles.lds_ellipsis}>
        <div>Loading....</div>
      </div>
    </div>
  </>);
}
/*
<div className={props.loading ? styles.body_loading : styles.none}>

*/