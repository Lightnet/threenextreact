/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    The url is process to load project files
*/

import { useEffect, useState } from 'react';
import AuthAccess from '../components/system/authaccess';
import EditorSection from '../components/editor/editorsection';
import { useRouter } from 'next/router';
import { EditorProvider } from '../components/editor/context/editorprovider';

export default function Editor(){

  const router = useRouter();
  const [projectID, setProjectID] = useState(null);

  useEffect(() => {
    const {projectid } = router.query;
    if(projectid){
      setProjectID(projectid);
    }
    return () => {
      //console.log('PAGE EDITOR CLEAN UP');
    }
  }, [router]);

  return(<>
    <AuthAccess>
      <EditorProvider>
        <EditorSection editorid={projectID}></EditorSection>
      </EditorProvider>
    </AuthAccess>
  </>)
}
/*

*/
