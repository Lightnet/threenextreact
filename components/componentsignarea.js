/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect } from 'react';
import { useSession, signOut, signIn } from "next-auth/react"
import { getSession } from "next-auth/react";


// https://next-auth.js.org/getting-started/client
// useSession()
export default function Component() {
  const { data: session, status } = useSession()
  console.log("[[[=== SIGN AREA ===]]]")
  console.log("status",status);
  console.log("session",session);

  if (session) {
    return (<>
    <p>Signed in as: {session.user.name}</p>
    <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  
  return (<>
    <label> Not signed in: User </label>
    <button onClick={() => signIn()}>Sign in</button>
    <a href="/auth/credentials-signup">Sign Up</a>
  </>);
}

/*
<button onClick={() => signOut()}>Sign out</button>
*/