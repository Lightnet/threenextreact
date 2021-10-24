/*
  LICENSE: MIT
  Created by: Lightnet
*/


import React, {useState, useEffect} from "react";

export default function Component() {
  const [users, setUsers] = useState("test");
  useEffect( async () => { 
    //const users = await prisma.user.findMany();
    //let prisma = getDB();
    //console.log(prisma);
    //console.log(users);
    setUsers(test);
  }, []);


  return (<>
    <div>{users}</div>
  </>);
}