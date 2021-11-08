/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/getting-started/client

import { useSession, signOut, signIn } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession()
  // session is always non-null inside this page, all the way down the React tree.
  return "Some super secret dashboard"
}

AdminDashboard.auth = true