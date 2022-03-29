/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/configuration/pages
import React,{ createRef, useEffect } from "react";
import { getCsrfToken } from "next-auth/react";
import Link from 'next/link';

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default function SignIn({ csrfToken }) {

  const inputRef = createRef(null);

  useEffect(()=>{
    inputRef.current.focus()
  },[])

  return (
    <center>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <table>
          <tbody>
            <tr>
              <td>
                <label>Username</label>
              </td>
              <td>
                <input ref={inputRef} name="alias" type="text" />
              </td>
            </tr>
            <tr>
              <td>
                <label>Password</label>
              </td>
              <td>
                <input name="passphrase" type="password" />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Link href="/">Back</Link><span> | </span>
                <button type="submit">Sign in</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
  )
}