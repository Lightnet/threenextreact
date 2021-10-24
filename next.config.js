//NEXTJS CONFIG

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log(PHASE_DEVELOPMENT_SERVER);
    return {
      /* development only config options here */
      testurl:"test"
    }
  }

  return {
    /* config options for all phases except development here */
  }
}