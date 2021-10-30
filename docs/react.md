https://reactjs.org/docs/hooks-reference.html
https://reactjs.org/docs/hooks-effect.html
https://www.robinwieruch.de/react-hooks-fetch-data/
https://reactjs.org/docs/concurrent-mode-suspense.html
https://dev.to/danialdezfouli/what-s-wrong-with-the-async-function-in-useeffect-4jne
https://www.freecodecamp.org/news/pass-data-between-components-in-react/
https://giters.com/jeremygottfried/react-ui-guide
https://reactjs.org/docs/hooks-state.html
https://www.pluralsight.com/guides/passing-state-of-parent-to-child-component-as-props
https://www.freecodecamp.org/news/pass-data-between-components-in-react/
https://www.pluralsight.com/guides/passing-state-of-parent-to-child-component-as-props
https://reactjs.org/docs/lists-and-keys.html

https://javascript.plainenglish.io/using-forwardref-with-react-hooks-9d0d096ad810


```js
const [ data, setData ] = useState(false);
setData(true);
```


```js
export default function Foo({children}) {//props
  return (<>
    {children}
  </>)
}
//example
import Foo from "./Foo";

<Foo>
  <label>Hello World!</label> //this is children
</Foo>
```

```js
import * as React from "react";
import Modal from "react-modal";
import { on } from "./events";
import "./style.css";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    on("openButton:click", () => setIsOpen(true));
  });

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <h1>Trigger modal outside React</h1>
      <p>Custom events are AWESOME!</p>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <p>I was opened by a modal outside of React. How cool is that?</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

```
https://reactcommunity.org/react-transition-group/transition

```js
function App() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Transition in={inProp} timeout={500}>
        {state => (
          // ...
        )}
      </Transition>
      <button onClick={() => setInProp(true)}>
        Click to Enter
      </button>
    </div>
  );
}
```

https://dmitripavlutin.com/react-useeffect-explanation/

```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

// https://blog.logrocket.com/guide-to-react-useeffect-hook/
// https://dmitripavlutin.com/react-useeffect-explanation/ (short good info)
```js
import { useEffect } from 'react';
function MyComponent() {
  useEffect(() => {
    // Runs after EVERY rendering
  });  
}
```


```js
import { useEffect } from 'react';
function MyComponent() {
  useEffect(() => {
    // Runs ONCE after initial rendering
  }, []);
}
```


```js
//render loop
useEffect(()=>{
  //set up
  const listener= (_, data) => {
    setTablist(data);
  };
  // listen add
  window.ipcRenderer.on('receive-tabs', listener);
  
  return ()=>{
    // remove listen
    window.ipcRenderer.removeListener('receive-tabs', listener);
  }
});
```


```js
```


```js
```