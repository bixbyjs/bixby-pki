/**
 * Module dependencies.
 */
var pkginfo = require('pkginfo')
  , os = require('os').type().toLowerCase()
  , path = require('path-os')
  , sks = require('sks')
  , uri = require('url')
  , bootable = require('bootable');


exports = module.exports = function(settings, logger) {
  var pkg = pkginfo.read(require.main).package;
  var options = settings.toObject();
  var type = options.keystore || 'fs'
    , dir, vendseg, keyseg, store;
  
  if (type == 'fs') {
    dir = options.path;
    if (!dir) {
      vendseg = pkg.author && pkg.author.organization
              ? path.join(pkg.author.organization, pkg.name)
              : pkg.name;
      if (!(os.indexOf('win') === 0 || os.indexOf('darwin') === 0)) {
        vendseg = vendseg.toLowerCase();
      }
      keyseg = options.pathSuffix || 'keys';
      dir = path.datadir(path.join(vendseg, keyseg));
    }
    store = new sks.FSKeyStore(dir);
  } else if (type == 'memory') {
    store = new sks.MemoryKeyStore();
  } else {
    throw new Error('Misconfigured PKI: unsupported keystore');
  }
  
  // Augument with bootable functionality.
  store = bootable(store);
  store.phase(require('./init/connect')(logger, options));
  
  return store;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
