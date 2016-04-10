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
exports = module.exports = function(settings, logger) {
  var config = settings.toObject();
  if (!config.algo) { config.algo = 'rsa'; }
  if (!config.naming) { config.naming = 'day'; }
  
  // TODO: Refactor this into a `KeyGenerator` class, where different 
  //       algorithms (RSA, etc) can be added as plugins, and formats, such
  //       as SSH.  Make keygen a function on the package's facade
  
  return function keygen(cb) {
    function generated(err, key, cert) {
      if(err) {
        logger.warn('keypair generation failed',err,config);
        return cb(err);
      }
      // add the unique key id based on config
      var kid;
      switch (config.naming) {
      case 'day':
        kid = (new Date()).toISOString().slice(0,10).split('-').join('');
        break;
      case 'hour':
        kid = (new Date()).toISOString().slice(0,13).split('-').join('');
        break;
      case 'minute':
        kid = (new Date()).toISOString().slice(0,16).split('-').join('').split(':').join('');
        break;
      case 'second':
        kid = (new Date()).toISOString().slice(0,19).split('-').join('').split(':').join('');
        break;
      case 'epoch':
        kid = Math.floor(Date.now()/1000).toString();
        break;
      default:
        return cb(new Error('Unsupported key naming format: ' + config.naming));
      }
      logger.debug('generated new keypair',kid);
      
      return cb(undefined, key, cert, kid);
    }
    
    switch (config.algo) {
    case 'rsa':
      return require('./generate/rsa')({ bits: config.bits }, generated);
    default:
      return cb(new Error('Unsupported key algorithm: ' + config.algo));
    }
  };
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
