/*
  LICENSE: MIT
  Created by: Lightnet
*/

// pages/_document.js

// https://stackoverflow.com/questions/51905803/next-js-how-to-change-css-of-root-div-next-on-specific-page

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  
  static async getInitialProps(ctx) {
    console.log("[[[[=== INIT DOC ====]]]]");

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
          <style>{`
            /* Other global styles such as 'html, body' etc... */
            /*
            #__next {
              height: 100%;
              width: 100%;
              margin: 0;
              padding: 0;
              position:fixed;
              top: 0;
              right: 0;
            }
            */
          `}</style>
        </body>
      </Html>
    )
  }
}

export default MyDocument
//page render handle doc