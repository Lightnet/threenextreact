
// https://reactjs.org/docs/hooks-reference.html#usereducer

import { useReducer } from "react";

function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  console.log(state);
  if(!state.count){
    state.count=0;
  }
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

//export default function Page({initialCount=0}) {
export default function Page({initialCount}) {

  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

/*
const initialState = {coutn:0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1 || 0};
    case 'decrement':
      return {count: state.count - 1 || 0};
    default:
      throw new Error();
  }
}

export default function Page() {

  const [state, dispatch] = useReducer(reducer,initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
*/