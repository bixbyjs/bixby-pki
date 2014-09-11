/**
 * Module dependencies.
 */
var sks = require('sks');


exports = module.exports = function(generator, keystore, settings, logger) {
  var config = settings.get('keys') || {};
  
  var rotator = new sks.Rotator(config, generator);
  return rotator;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ './generator', './keystore', 'settings', 'logger' ];
