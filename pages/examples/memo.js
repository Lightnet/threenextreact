// https://dmitripavlutin.com/use-react-memo-wisely/
// https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/


import React,{ useCallback, useEffect, useState } from "react"


function MyChild ({ onClick }) {
  useEffect(()=>{
    console.log("mychild?")
  },[])
  return <button onClick={onClick}>I am a child</button>;
}

export const MemoizeMyChild = React.memo(MyChild);

export default function Page() {
  const [count, setCount] = useState(0);

  const clickcount = useCallback(
    ()=>setCount(state=>state=state+1),
    [count,setCount]
  )

  return(<>
    <label>Count: {count}</label>
    {/* // First render - Memoize IS INVOKED. */}
    <MemoizeMyChild onClick={clickcount} />
    {/* // Second render - MemoizedMovie IS NOT INVOKED. */}
    <MemoizeMyChild onClick={clickcount} />
  
  </>)
}