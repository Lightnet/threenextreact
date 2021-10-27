//NEXTJS CONFIG
// https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
// https://jasonwatmore.com/post/2021/07/30/next-js-webpack-fix-for-modulenotfounderror-module-not-found-error-cant-resolve
// https://nextjs.org/docs/messages/webpack5
// https://github.com/prettier/prettier/issues/4959
// https://webpack.js.org/concepts/module-resolution/#root
// https://webpack.js.org/configuration/resolve/

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      console.log("__dirname");
      console.log(__dirname);
      console.log(path.resolve(__dirname, './node_modules/gun/gun.js'));

      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false//
        //gun:'./node_modules/gun/gun'
        //,gun$: path.resolve(__dirname, './node_modules/gun/gun.js'),
        ,_: path.resolve(__dirname, './node_modules/gun/gun.js'),
      }
      //config.resolve.alias.gun$=path.resolve(__dirname, './node_modules/gun/gun');
      //config.resolve.alias={//nextjs have override
        //gun: path.resolve(__dirname, './node_modules/gun/gun'),
      //}
    }
    return config;
  }
}

/*
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log(PHASE_DEVELOPMENT_SERVER);
    return {
      // development only config options here
      serverRuntimeConfig: {
        // Will only be available on the server side
        //mySecret: 'secret',
        //secondSecret: process.env.SECOND_SECRET, // Pass through env variables
        testurl:"test",
        isEmail:false,
        isRegister:false
      },
      publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/public',
      }
    }
  }

  return {
    // config options for all phases except development here 
    serverRuntimeConfig: {
      // Will only be available on the server side
      //mySecret: 'secret',
      //secondSecret: process.env.SECOND_SECRET, // Pass through env variables
      testurl:"test",
      isEmail:false,
      isRegister:false
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      staticFolder: '/public',
    }
  }
}
*/