/**
 * X.509 key generator.
 *
 * This component provides the functionality to generate SSL public/private key
 * pairs.  The key generated is an RSA key with a key length of 2048 bits.
 *
 * It is functionally equivalent to the following commands:
 *
 *   $ openssl genrsa -out privatekey.pem 2048
 *   $ openssl rsa -in privatekey.pem -pubout > publickey.pem
 *
 * @return {Function}
 */
exports = module.exports = function() {
  var KeyGenerator = require('./local/keygenerator');
  
  var generator = new KeyGenerator();
  
  // TODO: Load plugins
  
  return generator;
}

exports['@singleton'] = true;
exports['@require'] = [];

exports['@implements'] = 'http://i.bixbyjs.org/pki/KeyGenerator';
