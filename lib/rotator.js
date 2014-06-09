/**
 * Module dependencies.
 */
var sks = require('sks');


exports = module.exports = function(keystore, settings, logger) {
  var config = settings.get('keys') || {};
  
  var rotator = new sks.Rotator();
  // TODO: configure rotator with interval, key naming format, etc.
  //       algorithm, etc
  return rotator;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ './keystore', 'settings', 'logger' ];
