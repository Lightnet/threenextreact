/*
  LICENSE: MIT
  Created by: Lightnet
*/
//import '../style/globals.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app.js"

window.addEventListener('load', (event) => {
  let loading = document.getElementById("loading");
  if(loading){
    //loading.remove();
    document.body.removeChild(loading)
  }
  
  console.log('React page is fully loaded');
  let root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root);
  ReactDOM.render(<App />, document.getElementById('root'));
});
window.addEventListener("beforeunload", function(event) {
  fetch('/exit');
});