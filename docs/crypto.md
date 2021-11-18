https://stackoverflow.com/questions/8520973/how-to-create-a-pair-private-public-keys-using-node-js-crypto


https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey

https://www.section.io/engineering-education/secret-key-cryptography-in-js/


```js
const { generateKeyPair } = require('crypto');
generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret'
  }
}, (err, publicKey, privateKey) => {
  // Handle errors and use the generated key pair.
});
```

```js
var crypto = require('crypto');

var prime_length = 60;
var diffHell = crypto.createDiffieHellman(prime_length);

diffHell.generateKeys('base64');
console.log("Public Key : " ,diffHell.getPublicKey('base64'));
console.log("Private Key : " ,diffHell.getPrivateKey('base64'));

console.log("Public Key : " ,diffHell.getPublicKey('hex'));
console.log("Private Key : " ,diffHell.getPrivateKey('hex'));
```

```js
const crypto = require('crypto');

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
```