

// https://stackoverflow.com/questions/54229018/objects-are-not-valid-as-a-react-child-found-object-promise-if-you-meant-t/54229255

import React, {useState, useEffect} from "react";

export default function Component() {
  const [users, setUsers] = useState("test");
  let test="tests";

  useEffect( async () => { 
    setUsers(test);
  }, []);

  return (<>
    <div>{users}</div>
  </>);
}