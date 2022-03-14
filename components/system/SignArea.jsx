/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/getting-started/client

import React from "react";
import { useSession, signOut, signIn } from "next-auth/react"
import Link from 'next/link';
import ThemeLink from "../theme/ThemeLink";

export default function SignArea() {
  
  const { data: session, status } = useSession()

  if (status === "loading") {
    return(<>
      <label>Loading...</label>
    </>)
  }

  if (session) {
    return (<>
      <label>Signed in as: {session?.user?.name}</label>
      <button onClick={() => signOut()}>Sign out</button>
      <ThemeLink />
    </>);
  }
  
  return (<>
    <label> Not </label>
    <button onClick={() => signIn()}>Sign in</button>
    <span> | or | </span>
    <Link href="/auth/signup">Sign Up</Link> <span> | </span>
    <ThemeLink />
  </>);
  
  //return (<></>);
}