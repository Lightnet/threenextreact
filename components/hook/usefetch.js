/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://javascript.info/fetch
// https://github.github.io/fetch/
// https://medium.com/@9cv9official/what-are-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-17be31755d28
// https://dev.to/tienbku/javascript-fetch-getpostputdelete-example-3dmp
// // *GET, POST, PUT, DELETE, etc.

//GET, POST, PUT, DELETE, PATCH

export default async function useFetch(url,args){
  if(!url){
    return console.log("url error");
  }
  if(!args){
    args={};
  }
  args.method = args.method || 'GET';
  if(args.method == 'GET'){
    //console.log('GET!!');
    args.headers = {};
    args.body = null; //set to null for GET since is never allow
  }else{
    args.headers = args.headers || {"Content-Type": "application/json"};
    args.body = args.body || null;
  }

  try{
    let response = await fetch(url, args);
    if (!response.ok) {
      //const message = 'Error with Status Code: ' + response.status;
      //throw new Error(message);
      console.log("RESPONSE FETCH ERROR");
      return {error:'SERVER FETCH ERROR'};// check if the server error
    }
    let data = await response.json();
    return data;
  }catch(e){
    console.log("FETCH ERROR");
    console.log(e);
    return {error:'FETCH ERROR'}; //check for json format error
  }
}

/**
// Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
 */