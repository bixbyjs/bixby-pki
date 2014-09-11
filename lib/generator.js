/**
 * Module dependencies.
 */
var akeypair = require('akeypair');


exports = module.exports = function(settings, logger) {
  var config = settings.get('keys') || {};
  
  // TODO, branch out and support different types of keys
  return function genRSA(done){
    akeypair(config, done);
  };
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
