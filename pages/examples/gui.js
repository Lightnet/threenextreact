/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useState, useEffect } from 'react';
import Draggable from "../../components/ui/edragwindow";

import ESwitch from '../../components/ui/eswitch';
import EInput from '../../components/ui/einput';
import ECheckBox from '../../components/ui/echeckbox';

export default function Page(props) {
  //const [ isOPen, setisOpen ]=useState('block');
  //console.log(props)
  const countRef = useRef(0);

  const [isSwitch, setIsSwitch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("LOADED");
  }, []) 

  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };

  console.log('I rendered!');

  function updateSwitch(isswitch){
    console.log(isswitch)
    setIsSwitch(isswitch);
  }

  function getSwitch(){
    console.log(isSwitch);
  }

  function inputUpdateValue(val){
    setInputValue(val)
    console.log("INPUT: ",val);

  }

  return (<>
    <button onClick={handle}>Click me</button>

    <br />

    <ESwitch
      isswitch={isSwitch}
      updateSwitch={updateSwitch}
    ></ESwitch>

    <button onClick={getSwitch}>getSwitch{isSwitch?"[on]/off":"on/[off]"}</button>
    <br />

    <EInput
      value={inputValue}
      updateValue={inputUpdateValue}
     />

     <ECheckBox />


  </>);
}
/*

<Draggable>      
    </Draggable>

*/