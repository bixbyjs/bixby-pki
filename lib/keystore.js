/**
 * Module dependencies.
 */
var sks = require('sks')
  , uri = require('url');


exports = module.exports = function(settings, logger) {
  var config = settings.get('pki') || {};
  var store = config.keystore || 'fs';
  
  if (store == 'fs') {
    if (!config.path) { throw new Error('Misconfigured keystore: missing path'); }
    // TODO: configure rotator with interval, key naming format, etc.
    
    var store = new sks.FSKeyStore(config.path);
    return store;
  } else if (store == 'memory') {
    // TODO: Implement in-memory keystore
  } else {
    throw new Error('Misconfigured PKI: unsupported keystore');
  }
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
