

// https://stackoverflow.com/questions/54229018/objects-are-not-valid-as-a-react-child-found-object-promise-if-you-meant-t/54229255

import React, {useState, useEffect} from "react";
//import { PrismaClient } from '@prisma/client';
//import {clientdb, getDB} from "../pages/db"; //nope used api and fetch

export default function Component() {
  const [users, setUsers] = useState("test");
  //let prisma = new PrismaClient();
  let test="tests";

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