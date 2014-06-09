/**
 * Module dependencies.
 */
var sks = require('sks')
  , uri = require('url');


exports = module.exports = function(settings, logger) {
  var config = settings.get('keys') || {};
  if (!config.path) { throw new Error('Misconfigured keystore: missing path'); }
  
  var store = new sks.FSKeyStore(config.path);
  // TODO: configure rotator with interval, key naming format, etc.
  return store;
  
  // TODO: make keystore configurable, ie zookeeper etc.
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
