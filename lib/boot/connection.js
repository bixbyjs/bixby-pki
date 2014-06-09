/**
 * Module dependencies.
 */


exports = module.exports = function(keystore, settings, logger) {

  return function connection(done) {
    if (typeof keystore.connect !== 'function') {
      return done();
    }
    
    // TODO: connect if necessary
    return done();
  }
}

/**
 * Component annotations.
 */
exports['@require'] = [ '../keystore', 'settings', 'logger' ];
