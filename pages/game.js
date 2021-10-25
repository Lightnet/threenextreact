/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx) {

  return {
    props:{
      session: await getSession(ctx),
    }
  }
}

export default function Page({
  session
}){

  return(<>
    <p>game</p>
  </>);
}
