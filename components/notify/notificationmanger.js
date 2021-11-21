/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/59689702/invalid-prop-children-of-type-string-supplied-to-forwardreflistitemicon

import React, { useEffect, useState } from "react";
//import PropTypes from 'prop-types';
import CreateContainer from "./createcontainer";
import Notification from "./notification";

export default function NotificationsManager({ setNotify }) {

  let [notifications, setNotifications] = useState([]);

  let createNotification = ({ color, autoClose, children }) => {
    setNotifications((prevNotifications) => {
      return [
        ...prevNotifications,
        {
          children,
          color,
          autoClose,
          id: prevNotifications.length,
        },
      ];
    });
  };

  useEffect(() => {
    if(setNotify){
      let { color, autoClose, children } = setNotify;
      console.log(setNotify);
      createNotification({ color, autoClose, children });
    }
  }, [setNotify]);

  let deleteNotification = (id) => {
    const filteredNotifications = notifications.filter(
      (_, index) => id !== index,
      []
    );
    setNotifications(filteredNotifications);
  };

  return (
  <CreateContainer>
    {notifications.map(({ id, ...props }, index) => {
      //console.log(id);
      //console.log(index);
      console.log(props);
      //return (<label key={id}>Hello</label>);
      return (
      <Notification
        key={id}
        onDelete={() => deleteNotification(index)}
        //props={...props}//not used this will error in the logs //message is string will not work need html
        color={props.color}
        autoClose={props.autoClose}
        children={props.children}
      />);
    })}
  </CreateContainer>
  );
}

//NotificationsManager.propTypes = {
  //setNotify: PropTypes.func.isRequired,
//};