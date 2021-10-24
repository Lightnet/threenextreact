/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useSession, signOut, signIn } from "next-auth/react"

export default function Component() {
  const {data: session, loading} = useSession();
  //console.log("[[[[[[session");
  //console.log(session);
  if (session) {
    return (<>
    <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  return (<>
    <button onClick={() => signIn()}>Sign in</button>
    <a href="/auth/credentials-signup">Sign Up</a>
  </>);
}