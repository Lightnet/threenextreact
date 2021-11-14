/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    The url is process to load project files
*/

import { useEffect, useState } from 'react';
import AuthAccess from '../components/system/authaccess';
import EditorSection from '../components/editor/panel/editorsection';
import { useRouter } from 'next/router';

export default function Editor(){

  const router = useRouter();
  const [projectID, setProjectID] = useState(null);

  useEffect(() => {
    //console.log("INIT SET MOUNT!");
    const handleStart = (url) => {
      //url !== router.pathname ? setLoading(true) : setLoading(false);
      //console.log("loading:",loading);
    };
    const handleComplete = (url) =>{ 
      console.log(url);
      console.log(router.query)
      const {projectid } = router.query;
      if(projectid){
        setProjectID(projectid);
      }
      //console.log("FINISH LOADING...");
      //setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      console.log('PAGE EDITOR CLEAN UP');
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, [router]);

  return(<>
    <AuthAccess>
      <EditorSection editorid={projectID}>

      </EditorSection>
    </AuthAccess>
  </>)
}
/*

*/
