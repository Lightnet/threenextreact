// https://dev.to/sabrinasuarezarrieta/send-information-from-child-to-parent-callbacks-in-react-471k


import React, { useRef, useState, useEffect } from 'react';

function ChildComponent({parentCallback}){

  const handleClick = (e) => {
    parentCallback('wow you click the child component');
  };

  return (<>
    <button onClick={handleClick}>Click this child!</button>
  </>);
}

export default function Parent(){
  const[message, setMessage] = useState('hello');
    
  const modifyMessage= (data) => {
    setMessage( data)
  }

  return (<>
    <ChildComponent parentCallback={modifyMessage} ></ChildComponent>    
    <h1>{message}</h1>
  </>);
}
/*

<ChildComponent parentCallback={modifyMessage} ></ChildComponent>
*/