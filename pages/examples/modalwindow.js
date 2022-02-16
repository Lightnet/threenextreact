/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://docs.pmnd.rs/react-three-fiber/API/hooks
// https://dmitripavlutin.com/react-useref-guide/

import { useRef, useState, useEffect } from 'react';
import EWindow from "../../components/ui/ewindow";
import Modal from "../../components/ui/emodal";
import ThemeLink from '../../components/theme/themelink';

export default function Page(props) {
  const [ isOPen, setisOpen ]=useState('block');
  const countRef = useRef(0);

  useEffect(() => {
    console.log("LOADED");
  }, [])

  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
    setisOpen(true);
  };
  
  function closeModal(){
    setisOpen(false);
  }

  console.log('I rendered!');

  return (<>
    <ThemeLink />
    <button onClick={handle}>Click me</button>
    <EWindow>      
    </EWindow>

    <Modal
    isOpen={isOPen}
    closeModal={closeModal}
    ></Modal>
  </>);
}