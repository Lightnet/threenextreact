/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/configuration/options
import { getToken } from "next-auth/jwt"

const secret = process.env.JWT_SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)
  res.end()
}