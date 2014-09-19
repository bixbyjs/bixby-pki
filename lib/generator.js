/**
 * Module dependencies.
 */
var akeypair = require('akeypair');


exports = module.exports = function(settings, logger) {
  var config = settings.toObject();
  if (!config.type) { config.type = 'rsa' }
  if (!config.naming) { config.naming = 'day'; }
  
  return function generate(cb) {
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
      
      return cb(undefined, kid, key, cert);
    }
    
    switch (config.type) {
    case 'rsa':
      return require('./generate/rsa')({ bits: config.bits }, generated);
    default:
      return cb(new Error('Unsupported key type: ' + config.type));
    }
  };
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
