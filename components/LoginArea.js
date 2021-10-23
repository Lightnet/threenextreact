import { useSession, signOut, signIn } from "next-auth/react"

export default function Component() {
  const {data: session, loading} = useSession();

  console.log("[[[[[[session");
  console.log(session);
  if (session) {
    return (<>
    <p>Signed in as: {session.user}</p>
    <button onClick={() => signOut()}>Sign out</button>
    </>);
  }

  return (<>
    <label> Not signed in: User </label>
    <button onClick={() => signIn()}>Sign in</button>
    <a href="/auth/credentials-signup"> Sign Up</a>
  </>);

  //return (<a href="/api/auth/signin">Sign in</a>);
}