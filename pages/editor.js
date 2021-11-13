/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    The url is process to load project files
*/

import { useEffect, useState } from 'react';
import AuthAccess from '../components/system/authaccess';
import EditorSection from '../components/editor/panel/editorsection';

export default function Editor(){

  useEffect(() => {
    console.log("INIT SET MOUNT!");
    return ()=>{
      console.log('clean up');
    };
  }, []);


  return(<>
    <AuthAccess>
      <EditorSection>

      </EditorSection>
    </AuthAccess>
  </>)
}
/*

*/
