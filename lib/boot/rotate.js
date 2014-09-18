/**
 * Module dependencies.
 */

exports = module.exports = function(rotator, settings, logger) {
  var config = settings.get('pki') || {};

  return function rotate(done) {
    if (config.rotate === 0) {
      logger.warn('key rotation disabled');
      return process.nextTick(done);
    }
    
    logger.debug('starting key rotation',rotator.frequency);
    rotator.start(function() {
      done();
    });
    
    rotator.on('rotate', function(kid) {
      logger.info('Rotated to new key pair: ' + kid);
    });
    
    rotator.on('fail', function(err) {
      logger.warn('Key rotation failed: ' + err.message);
    });
    
    // NOTE: By default, if an error is encountered from the rotator it will be
    //       rethrown.  This will cause an `uncaughtException` within Node and
    //       the process will exit.  In accordance with a microservices
    //       architecture, it is expected that a higher-level monitor will
    //       detect process failures and restart as necessary.
    rotator.on('error', function(err) {
      logger.error('Unexpected error from key rotator: %s', err.message);
      logger.error(err.stack);
      throw err;
    });
  }
}

/**
 * Component annotations.
 */
exports['@require'] = [ '../rotator', 'settings', 'logger' ];
