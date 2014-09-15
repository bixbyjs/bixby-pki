/**
 * Module dependencies.
 */

exports = module.exports = function(rotator, settings, logger) {
  var config = settings.get('keys') || {};

  return function rotate(done) {
    if (config.rotate === 0)
    {
      logger.info('key rotation disabled');
      return done();
    }
    logger.debug('starting key rotation',rotator.frequency);
    rotator.start(); // TODO make async
    return done();
  }
}

/**
 * Component annotations.
 */
exports['@require'] = [ '../rotator', 'settings', 'logger' ];
