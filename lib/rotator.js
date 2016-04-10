/**
 * Module dependencies.
 */
var sks = require('sks');


exports = module.exports = function(keygen, keystore, settings, logger) {
  var config = settings.toObject();
  
  var rotator = new sks.Rotator(keystore, keygen, { frequency: config.rotate });
  return rotator;
  
  // TODO: Use this funciton when rotating keys to assign them an ID
  //       based on the time
  /*
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
  */
  
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ './keygen', './keystore', 'settings', 'logger' ];
