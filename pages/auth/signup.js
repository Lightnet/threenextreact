/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/configuration/pages
import React from 'react';
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

export default function SignUp({ csrfToken }) {
  return (
    <center>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <input name="isNewUser" type="hidden" defaultValue="true" />
        <table>
          <tbody>
            <tr>
              <td>
                <label>Username</label>
              </td>
              <td>
                <input name="alias" type="text" />
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
                <center>
                <Link href="/">Back</Link><span> | </span>
                <button type="submit">Register</button>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
  )
}