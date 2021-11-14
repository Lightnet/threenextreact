/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useState, useEffect } from 'react';
import { getSession } from "next-auth/react";
import AuthAccess from '../../components/system/authaccess';

export async function getServerSideProps(ctx) {

  return {
    props:{
      session: await getSession(ctx)
    }
  }
}

export default function Page({session}) {

  useEffect(() => {
    console.log("LOADED");

  }, [])

  return (<>
    <AuthAccess>

    </AuthAccess>
  </>);
}