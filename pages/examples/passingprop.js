// https://www.freecodecamp.org/news/react-props-cheatsheet/
// https://stackoverflow.com/questions/39652686/pass-react-component-as-props
// https://stackoverflow.com/questions/28452358/what-is-the-meaning-of-this-props-in-reactjs/28452430
import React, { useRef, useState, useEffect } from 'react';

function SubComponent(props){
  let sut = 'testssss';


  console.log("sub test:",props)
  console.log("sub this: ",this);


  return (<>
    <button >Click this sub child!</button>
  </>);
}


//function ChildComponent({props,Component,message}){
function ChildComponent(props){

  //useEffect(()=>{
    //if(message){
      //console.log("useEffect child: ",message);
    //}
  //},[message]);

  useEffect(()=>{
      //console.log("useEffect child: ",props);
  },[props]);

  //console.log("message: ",message);
  //console.log("Component: ",Component);
  //console.log("child props: ",props);

  function handleClick(){

  }
  console.log("this: ",this);

  let test ='test child';

  const allProps = { test, ...props };


  return (<>
    <button onClick={handleClick}>Click this child!</button>
    <SubComponent {...allProps}></SubComponent>
  </>)
}

//export default function PassProp({pageProps,props,Component}){
export default function PassProp(props){
  const[message, setMessage] = useState('hello');

  //useEffect(()=>{
    //console.log(Component);
  //},[Component])


  //useEffect(()=>{
    //console.log(pageProps);
  //},[pageProps])

  console.log("PassProp message: ",message);
  //console.log("PassProp Component: ",Component);
  console.log("PassProp props: ",props);
  //console.log("PassProp pageProps: ",pageProps);


  return (<>
      <ChildComponent {...{message}}>

      </ChildComponent>
  </>);
}
/*
  return (<>
    <Component {...message}>
      <ChildComponent>

      </ChildComponent>
    </Component>
*/