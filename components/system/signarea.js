/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/getting-started/client

//import { useEffect } from 'react';
import { useSession, signOut, signIn } from "next-auth/react"
import Link from 'next/link';

export default function Component() {
  const { data: session, status } = useSession()
  //console.log("[[[=== SIGN AREA ===]]]")
  //console.log("status",status);
  //console.log("session",session);

  if (status === "loading") {
    return(<>
      <label>Loading...</label>
    </>)
  }

  if (session) {
    return (<>
      <label>Signed in as: {session?.user?.name}</label>
      <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  
  return (<>
    <label> Not </label>
    <button onClick={() => signIn()}>Sign in</button>
    <span> | or | </span>
    <Link href="/auth/signup">Sign Up</Link>
  </>);
}