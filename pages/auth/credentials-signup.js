/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/configuration/pages

import { getCsrfToken } from "next-auth/react";

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default function SignIn({ csrfToken }) {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <input name="newUser" type="hidden" defaultValue="true" />
      <label>
        Username
        <input name="alias" type="text" />
      </label>
      <label>
        Password
        <input name="passphrase" type="password" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  )
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/