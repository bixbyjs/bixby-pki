/**
 * Module dependencies.
 */
var sks = require('sks');


exports = module.exports = function(keygen, keystore, settings, logger) {
  var config = settings.toObject();
  
  var rotator = new sks.Rotator(keystore, keygen, { frequency: config.rotate });
  return rotator;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ './keygen', './keystore', 'settings', 'logger' ];
