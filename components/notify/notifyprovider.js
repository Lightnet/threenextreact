/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    By using the context and provider to handle notify message to top right corner.
    To call dispatchNotify with array params.

    dispatchNotify({//array
      type: 'add' // recommend 
      , color: "info" // info, success, warning, error // recommend 
      , id: nanoid16() // optional, delete event and reactjs key  
      , children: <label>ASDASD</label> || "hello world"  // display message, recommend 
      , autoClose: true // optional 
    })

  hooks:
    - Context
    - reducer
    - Provider
    - dispatch

*/

// https://stackoverflow.com/questions/54605190/successfully-firing-two-usereducer-hooks-in-a-row
// https://stackoverflow.com/questions/57280466/can-usereducer-work-with-an-array-for-state
// https://stackoverflow.com/questions/34582678/is-this-the-correct-way-to-delete-an-item-using-redux
// https://javascript.tutorialink.com/delete-element-from-array-in-redux-state-using-a-reducer-in-createslice/
// https://www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates/
// https://alligator.io/react/usereducer/
// https://blog.logrocket.com/guide-to-react-usereducer-hook/
// https://www.robinwieruch.de/javascript-reducer/

// working
// https://codesandbox.io/s/fragrant-browser-br6el?fontsize=14
// https://daveceddia.com/usereducer-hook-examples/

import React,{ createContext, useContext, useMemo, useReducer } from "react";
import { nanoid16 } from "../../lib/helper.js";

export const nottifyContext = createContext();

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

export function useNotifty(){
  const context = useContext(nottifyContext);
  if (!context) {
    throw new Error(`useNotifty must be used within a notifyContext`)
  }
  return context;
}

// this is dispatch events
function reducerNotify(state, action) {
  //console.log(action);
  switch (action.type) {
    // do something with the action
    case 'add':
      // do checks arg or params
      let color =  action.color || Color.info; //default to info
      let autoClose =  action.autoClose || true; //default autoclose true
      let id =  action.id || nanoid16(); //default random id
      let children;
      //console.log(typeof action.children);

      if(typeof action.children == 'object'){
        children=action.children;
      }else{//string, number, bool is convert check to string
        children=<label> {String(action.children)} </label>
      }

      return [
        ...state,
        {
          color: color
          , id: id
          , children: children
          , autoClose: autoClose
        }
      ];
    case 'remove':
      // keep every item except the one we want to remove
      return state.filter((item) => item.id != action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

// need to top layer of app where Providers
export function NotifyProvider(props){
  //     state     dispatch          useReducer/ function     /init variable
  const [notifies, dispatchNotify] = useReducer(reducerNotify, []);

  const value = useMemo(()=>({
    notifies, dispatchNotify
  }),[
    notifies
  ])

  return <nottifyContext.Provider value={value} {...props} />
}