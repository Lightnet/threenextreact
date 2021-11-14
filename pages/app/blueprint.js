/*
  LICENSE: MIT
  Created by: Lightnet
*/

import AuthAccess from "../../components/system/authaccess";
import BlueprintSection from "../../components/blueprint/blueprintsection";

export default function Page() {

  function onMouse(){
    console.log("Click")
  }

  return (<>
    <AuthAccess>
      <BlueprintSection>

      </BlueprintSection>
    </AuthAccess>
  </>);
}