// https://reactjs.org/docs/hooks-reference.html#usecallback
// https://dmitripavlutin.com/dont-overuse-react-usecallback/
import { useCallback, useState } from "react"


function MyChild ({ onClick }) {
  return <button onClick={onClick}>I am a child</button>;
}

export default function Page() {
  const [count, setCount] = useState(0);

  const clickcount = useCallback(
    ()=>setCount(state=>state=state+1),
    [count,setCount]
  )

  return(<>
    <label>Count: {count}</label>
    <MyChild onClick={clickcount} />
  
  </>)
}

/*
//... file
import useSearch from './fetch-items';
function MyBigList({ term, onItemClick }) {
  const items = useSearch(term);
  const map = item => <div onClick={onItemClick}>{item}</div>;
  return <div>{items.map(map)}</div>;
}
export default React.memo(MyBigList);

//... file

import { useCallback } from 'react';
export function MyParent({ term }) {
  const onItemClick = useCallback(event => {
    console.log('You clicked ', event.currentTarget);
  }, [term]);
  return (
    <MyBigList
      term={term}
      onItemClick={onItemClick}
    />
  );
}

*/




//bad example
/*
export default function Page() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const clickcount = useCallback(
    ()=>setCount(state=>state=state+1),
    [count,setCount]
  )

  function toggleOn(){
    
    setIsOn(!isOn)
    console.log(isOn)
  }

  return(<>
    <label>Count: {count}</label>
    <button onClick={clickcount}> Counter </button>
    <label>isOn: {isOn?"true":"false"}</label>
    <button onClick={toggleOn}> toggle </button>
  
  </>)
}
*/