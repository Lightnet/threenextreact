/*
  LICENSE: MIT
  Created by: Lightnet
*/
//import '../style/globals.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App.jsx"

window.addEventListener('load', (event) => {
  let loading = document.getElementById("loading");
  if(loading){
    //loading.remove();
    document.body.removeChild(loading)
  }

  const container = document.getElementById('app');

  // Create a root.
  const root = ReactDOM.createRoot(container);

  // Initial render
  root.render(<App/>);

});
window.addEventListener("beforeunload", function(event) {
  //fetch('/exit');
});