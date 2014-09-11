/**
 * Module dependencies.
 */


exports = module.exports = function(rotator, settings, logger) {

  return function rotate(done) {
    rotator.start(); // TODO make async
    return done();
  }
}

/**
 * Component annotations.
 */
exports['@require'] = [ '../rotator', 'settings', 'logger' ];
