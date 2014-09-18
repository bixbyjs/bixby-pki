/**
 * Module dependencies.
 */
var sks = require('sks');


exports = module.exports = function(generator, keystore, settings, logger) {
  var config = settings.get('pki') || {};
  
  var rotator = new sks.Rotator(keystore, generator, { frequency: config.rotate });
  return rotator;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ './generator', './keystore', 'settings', 'logger' ];
