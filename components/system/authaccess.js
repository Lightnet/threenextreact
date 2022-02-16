/*
# License: MIT
# Created By: Lightnet
*/

import { useSession } from "next-auth/react";
import Sign from "./sign";

export default function AuthAccess({children}) {
  
  const {data: session, status } = useSession();

  // session check while loading
  if (status === "loading") {
    return(<>
      <div>Loading...</div>
    </>)
  }

  if ((session !=null) && (status === "authenticated")) {
    return(<>
      {children}
    </>)
  }

  return (<>
    <Sign></Sign>
  </>)
  
  return (<>
    {children}
  </>)
}