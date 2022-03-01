/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    The url is process to load project files
*/

import React, { useEffect, useState } from 'react';
import AuthAccess from '../components/system/authaccess';
import { useRouter } from 'next/router';
import { ProjectProvider } from '../components/three/context/ProjectProvider';
import { EditorProvider } from '../components/three/context/EditorProvider';
import Editor from '../components/three/Editor';
import { EntityProvider } from '../components/three/context/EntityProvider';

export default function EditorPage(){

  const router = useRouter();
  const [projectID, setProjectID] = useState(null);

  useEffect(() => {
    const {projectid } = router.query;
    if(projectid){
      //console.log(projectid);
      setProjectID(projectid);
    }
    return () => {
      //console.log('PAGE EDITOR CLEAN UP');
    }
  }, [router]);

  return(<>
    <AuthAccess>
      <ProjectProvider>
        <EditorProvider>
          <EntityProvider>
            <Editor projectid={projectID} />          
          </EntityProvider>
        </EditorProvider>
      </ProjectProvider>
    </AuthAccess>
  </>)
}