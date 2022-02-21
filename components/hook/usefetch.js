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

export default async function useFetch(url, options){
  try{
    if(!url){
      console.log("url error");
      return {error:'null url ERROR'}
    }
    if(!options){
      options={};
    }
    console.log(options)
    let response = await fetch(url, options);
    if (!response.ok) {
      //const message = 'Error with Status Code: ' + response.status;
      //throw new Error(message);
      console.log("RESPONSE FETCH ERROR");
      return {error:'SERVER FETCH ERROR'};// check if the server error
    }
    let data = await response.json();
    return data;
  }catch(e){
    console.log("TRY FETCH ERROR: ", e);
    return {error:'TRY FETCH ERROR'}; //check for json format error
  }
}