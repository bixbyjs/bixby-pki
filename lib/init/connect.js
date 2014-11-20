/**
 * Module dependencies.
 */


exports = module.exports = function(logger, options) {
  options = options || {};

  return function connect(done) {
    if (typeof this.connect !== 'function') {
      return done();
    }
    
    // TODO: connect if necessary
    return done();
  }
}
