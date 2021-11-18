// https://dev.to/sabrinasuarezarrieta/send-information-from-child-to-parent-callbacks-in-react-471k

import React, { useRef, useState, useEffect } from 'react';

function SimpleInput({parentCallback}){

  const [inputValue, setInputValue] = React.useState("");

  const onChangeHandler = event => {
    setInputValue(event.target.value);
  };

  return (<>
    <input 
      onChange={onChangeHandler}
      value={inputValue}
    ></input>
  </>);
}

export default function Parent(){
  const[message, setMessage] = useState('hello');
    
  const modifyMessage= (data) => {
    setMessage( data)
  }

  return (<>
    <SimpleInput ></SimpleInput>    
    <h1>{message}</h1>
  </>);
}
