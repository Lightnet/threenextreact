/*
  LICENSE: MIT
  Created by: Lightnet
*/

// notify/index.js
// https://stackoverflow.com/questions/36772389/how-can-i-add-multiple-classnames-to-react-component/36772461
// https://tinloof.com/blog/how-to-create-react-notifications-with-0-dependencies/

//import React from "react";
//import { ReactDOM } from "react";
//import CreateContainer from "./createcontainer";
import NotificationsManager from "./notificationmanger";
import { Notification, Color } from "./notification";

export{
  Notification,
  Color,
  NotificationsManager
}

//const containerElement = createContainer();
//let notify;
/*
ReactDOM.render(
  <NotificationsManager
    setNotify={(notifyFn) => {
      notify = notifyFn;
    }}
  />,
  document.getElementById('notifyContainer')//<CreateContainer></CreateContainer>
);
*/
/*
export function info(children, autoClose) {
  return notify({
    color: Color.info,
    children,
    autoClose,
  });
}

export function success(children, autoClose) {
  return notify({
    color: Color.success,
    children,
    autoClose,
  });
}

export function warning(children, autoClose) {
  return notify({
    color: Color.warning,
    children,
    autoClose,
  });
}

export function error(children, autoClose) {
  return notify({
    color: Color.error,
    children,
    autoClose,
  });
}
*/