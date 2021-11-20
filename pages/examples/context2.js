/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://react-redux.js.org/tutorials/quick-start
// https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/
// https://kentcdodds.com/blog/application-state-management-with-react
// https://codesandbox.io/s/wyx58yqvjl?from-embed=&file=/src/appContext.js


import React,{ createContext, useState, useMemo, useContext } from "react";

//export const UserContext = createContext({ user: null });
export const UserContext = createContext();

function useUser(){
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useCount must be used within a UserContext`)
  }
  //return context

  const [user, setUser] = context

  const defaultUser = ()=>{setUser('')};

  return [
    user, 
    setUser,
    defaultUser
  ]
}

function UserProvider(props){
  const [user, setUser] = useState(null);
  const value = useMemo(()=>[user, setUser],[user])
  return <UserContext.Provider value={value} {...props} />
}

function UserDisplay() {
  const [user] = useUser()
  return <div>The current counter User is {user}</div>
}

function User() {
  const [user, setUser, defaultUser] = useUser()
  
  function toggle(){
    if(user){
      setUser("");
    }else{
      setUser("test")
    }
  }

  return (<>
  <button onClick={toggle}>{user} display name</button>
  <button onClick={defaultUser}> defaultUser</button>
  </>)
}

export default function Page() {
  return (<>
    <UserProvider>
       <UserDisplay></UserDisplay>
        <User></User>
     </UserProvider>
    </>);
}