/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://nextjs.org/learn/basics/api-routes/creating-api-routes
// https://nextjs.org/learn/basics/api-routes/api-routes-details

//export default function handler(req, res) {
  //res.status(200).json({ text: 'Hello' })
//}

import { getSession } from "next-auth/client"

export default async (req, res) => {
  const session = await getSession({ req })
  console.log("session");
  console.log(session);
  res.end();
}