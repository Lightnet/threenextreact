/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default async (req, res) => {
  console.log("page/api/gun/[id].js");
  console.log("req.method");
  console.log(req.method);
  console.log("req.path");
  console.log(req.path);
  console.log(req.url);


  res.end();
};