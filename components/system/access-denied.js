/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useSession, signOut } from "next-auth/react";

export default function Component() {
  const {data: session, status} = useSession();
  //console.log("session: ", session);

  if (status === "loading") {
    return(<>
      <label>Loading...</label>
    </>)
  }

  if ((session !=null)&&(status === "authenticated")){
    return (<>
      <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  return (<>
    <label> [ ACCESS DENIED ] </label>
  </>);
}