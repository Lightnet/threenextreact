// https://riptutorial.com/javascript/example/17846/converting-pem-key-pair-to-cryptokey

const crypto = require('crypto')

let rankey =  crypto.randomBytes(32).toString('hex');
console.log(rankey);

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
}); 

console.log(publicKey)
console.log(privateKey)





