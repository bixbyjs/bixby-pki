/**
 * Module dependencies.
 */
var akeypair = require('akeypair');


exports = module.exports = function(settings, logger) {
  var config = settings.get('keys') || {};
  if(!config.naming) { config.naming = 'day'; }
  
  // TODO, branch out and support different types of keys
  return function genRSA(done){
    akeypair(config, function(err, pair){
      if(err) {
        logger.warn('keypair generation failed',err,config);
        return done(err);
      }
      // add the unique key id based on config
      if(config.naming == 'day') {
        pair.kid = (new Date()).toISOString().slice(0,10).split('-').join('');
      }
      if(config.naming == 'hour') {
        pair.kid = (new Date()).toISOString().slice(0,13).split('-').join('');
      }
      if(config.naming == 'epoch') {
        pair.kid = Math.floor(Date.now()/1000).toString();
      }
      logger.info('generated new keypair',pair.kid);
      done(undefined, pair);
    });
  };
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
