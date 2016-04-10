/**
 * RSA key generator.
 *
 * Generates an RSA public/private key pair.
 *
 * Calling this function is functionally equivalent to the following commands:
 *
 *   $ openssl genrsa -out privatekey.pem 2048
 *   $ openssl rsa -in privatekey.pem -pubout > publickey.pem
 *
 * @return {function}
 */
exports = module.exports = function() {
  // Load modules.
  var akeypair = require('akeypair');
  
  return function(options, cb) {
    akeypair(options, function(err, pair) {
      if (err) { return cb(err); }
      return cb(null, pair.private, pair.public);
    });
  };
};


exports['@require'] = [ '' ];

exports['@implements'] = 'http://i.bixbyjs.org/pki/keygenFunc';
exports['@algorithm'] = [ 'rsa' ];
