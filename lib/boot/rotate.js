/**
 * Module dependencies.
 */

exports = module.exports = function(rotator, settings, logger) {
  var config = settings.get('pki') || {};

  return function rotate() {
    if (config.rotate === 0) {
      logger.warn('key rotation disabled');
      return;
    }
    
    logger.debug('starting key rotation',rotator.frequency);
    rotator.start();
    
    rotator.on('rotate', function(kid) {
      logger.info('Rotated to new key pair: ' + kid);
    });
    
    rotator.on('fail', function(err) {
      logger.warn('Key rotation failed: ' + err.message);
    });
  }
}

/**
 * Component annotations.
 */
exports['@require'] = [ '../rotator', 'settings', 'logger' ];
