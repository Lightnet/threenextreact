# Design:
  By using the react functions and features is need for aplication to work correctly. Since the react does render each frame for the components.

  Some variable are not change able. Require class functions from react. Reason that component required with react setup variable to interact with the input and other things.


# useRef() hook
https://livebook.manning.com/book/react-hooks-in-action/chapter-6/v-3/


-calling the useRef hook to obtain a ref
-updating a ref by assigning values to its current property
```js
var data =useRef("text");
data.current // "text"
```
-updating state without triggering re-renders
-


```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
return(
<ul>{listItems}</ul>
)
```
https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating

Please note that all these solutions will fail with a stack overflow error if array b is too long (trouble starts at about 100,000 elements, depending on the browser).
If you cannot guarantee that b is short enough, you should use a standard loop-based technique described in the other answer.

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={id}>{number}</li> // key to deal with id key that check duplicate
);

return(
<ul>{listItems}</ul>
)
```

```js
  const countRef = useRef(0);

  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };

return (<>
  <button onClick={handle}>Click me</button>
</>);  

```

# DESIGN:THREE (work in progress)
- editor modular component
- there are main and sub component to handle editor.
- main where the editor handle call from sub childrens.
  - compoent rely on call backs and event to handle 
- sub compoent are out side of the editor like window tabs. It would required some web socket events.

# DESIGN: API (work in progress)
- fetch and query
- to handle json object format.
- database save, load, edit and delete on server
- need auth and access key between layers

# DESIGN:UI: (work in progress)
- three.js ui or html ui for game or editor.
- game entity components predefine.
- 

# DESIGN:REACT (work in progress)
- to handle custom or script ui to fix the editor signal event for ease of access variables.
- 

