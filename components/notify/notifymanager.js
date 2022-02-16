/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Notify manager place in element where app root in sub

*/

import React from "react";
import Notification from "./notification.js";
import NotifyContainer from "./notifycontainer.js";
import { useNotifty } from "./notifyprovider.js";

export default function NotifyManager(){

  const {
    notifies
    , dispatchNotify
  } = useNotifty();

  function deleteNotification(id){
    dispatchNotify({
      type:'remove'
      , id:id
    })
  }

  return (<NotifyContainer>
    {notifies.map((item)=>{
      return <Notification 
        key={item.id}
        onDelete={() => deleteNotification(item.id)}
        color={item.color}
        autoClose={item.autoClose}
        children={item.children}
      />
    })}
  </NotifyContainer>)
}