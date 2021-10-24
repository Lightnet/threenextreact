/*
  LICENSE: MIT
  Created by: Lightnet
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    /*
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    })
    */
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        alias: { label: "Alias", type: "text", placeholder: "John Doe" },
        passphrase: {  label: "Passphrase", type: "password", placeholder:"PASSWORD" }
      },
      async authorize(credentials, req) {
        //console.log("CHECKING AUTH !!!");
        //const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        //return user;
        
        let hosturl;
        if(process.env.NODE_ENV == 'development'){
          hosturl=process.env.HOSTURL + '/api/signin';
        }else{
          hosturl=process.env.HOSTURL +'/api/signin';
        }
        //console.log(hosturl);
        let res;
        try{
          //required full url path else it fail get data if there no catch
          res = await fetch(hosturl, {
            method: 'POST',
            //headers: { "Content-Type": "application/json" }
            body: JSON.stringify(credentials)
          });
        }catch(e){
          console.log(e);
          return null;
        }
        const user = await res.json();
        console.log("[[[=== CredentialsProvider user ===]]]");
        console.log(user);
        if(user.error){
          console.log("NOTFOUND! USER!");
          return null;
        }
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        
        // Return null if user data could not be retrieved
        return null;
      }
    })

  ],
  // https://next-auth.js.org/configuration/callbacks
  // https://next-auth.js.org/getting-started/client
  /*
  {
  user: {
    name: string
    email: string
    image: string
    },
    expires: Date // This is the expiry of the session, not any of the tokens within the session
  }

  */
  callbacks: {
    
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("[[[=== callbacks jwt ===]]");
      console.log(token);
      console.log(user);
      console.log(account);
      console.log(profile);
      console.log(isNewUser);

      //nope
      //if (user) {
        //if(user.token){
          //token.accessToken = user.token
        //}
        //if(user.id){
          //token.id = user.id;
          //token.name = user.alias;
          //token.name = user.alias;
        //}
      //}
      
      return token; 
    },
    
    async session({ session, user, token }) {
      console.log("[[[=== callbacks session ===]]]");
      console.log(session);
      console.log(user);
      console.log("[[[[[[[[[[token]]]]]]]]");

      console.log(token);
      //if(user){
        //session.user=user.user;
      //}
      //if(token){
        //session.user = token.name;
      //}

      if(token){//ok?
        session.user={
          name:token.name,
          email:token.email
        }
        //session.user=token.name;
      }
      return session;
    }
    
  },
  //database: process.env.DATABASE_URL,
  //secret: process.env.SECRET,
  // https://next-auth.js.org/configuration/options
  session: {
    jwt: true,
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    //updateAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60 // 24 hours
  },
  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw'
    //signingKey: {
      //kty: "oct",
      //kid: "Dl893BEV-iVE-x9EC52TDmlJUgGm9oZ99_ZL025Hc5Q",
      //alg: "HS512",
      //k: "K7QqRmJOKRK2qcCKV_pi9PSBv3XP0fpTu30TP8xn4w01xR3ZMZM38yL2DnTVPVw6e4yhdh0jtoah-i4c_pZagA"
    //}
  },
  // https://stackoverflow.com/questions/68188861/next-auth-how-the-registration-is-handled-with-a-email-password-credential-p
  // https://github.com/nextauthjs/next-auth/discussions/791
  // https://next-auth.js.org/configuration/pages
  //pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: '/auth/new-user' // If set, new users will be directed here on first sign in
  //},
  theme: 'light',
  debug: true
})