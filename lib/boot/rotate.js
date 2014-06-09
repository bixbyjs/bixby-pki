/**
 * Module dependencies.
 */


exports = module.exports = function(rotator, settings, logger) {

  return function rotate(done) {
    return done();
  }
}

/**
 * Component annotations.
 */
exports['@require'] = [ '../rotator', 'settings', 'logger' ];
