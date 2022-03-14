/*
  LICENSE: MIT
  Created by: Lightnet

*/
import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from 'next/link';

export default function Sign() {
  
  const {data: session, status} = useSession();
  //console.log(session);

  if (status === "loading") {
    return(<>
      <div>Loading...</div>
    </>)
  }

  if ((session !=null)&&(status === "authenticated")){
    return (<>
    <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  
  return (<>
    <button onClick={() => signIn()}>Sign in</button> <Link href="/auth/signup">Sign Up</Link>
  </>);

  //return (<></>);
}