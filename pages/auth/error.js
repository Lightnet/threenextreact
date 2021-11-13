/*
# License: MIT
# Created By: Lightnet
*/

import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Error() {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    //console.log("router.pathname");
    //console.log(router.pathname)
    //console.log("router.query")
    //console.log(router.query)
    let { error } = router.query;
    //console.log("error");
    //console.log(error);
    setErrorMessage(error);
  }, [router]);//need to load query since null mount then it process later

  function renderError(){
    if(errorMessage=='USEREXIST'){
      return (<div>
        <label>{errorMessage}</label>
        <br />
        <Link href="/">Home</Link><span> | </span>
        <Link href="/auth/signup">Sign Up</Link>
      </div>)
    }else if(errorMessage=='NOTFOUND'){
      return (<div>
        <label>{errorMessage}</label>
        <br />
        <Link href="/">Home</Link><span> | </span>
        <Link href="/auth/signup">Sign Up</Link>
      </div>)
    }else if(errorMessage=='PASSWORDFAIL'){
      return (<div>
        <label>{errorMessage}</label>
        <br />
        <Link href="/">Home</Link><span> | </span>
        <Link href="/auth/signin">Sign In</Link>
      </div>)
    }
    if(errorMessage){
      return (<div>
        <label>{errorMessage}</label>
        <br />
        <Link href="/">Home</Link>
      </div>)
    }

    return (
    <div>
      <label>checking...</label>
      <br />
      <Link href="/">Home</Link>
    </div>)
  }

  return (<>
    <center>
      <label>Error Page</label>
      {renderError()}
    </center>
  </>)
}