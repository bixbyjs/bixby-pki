/**
 * Module dependencies.
 */
var pkginfo = require('pkginfo')
  , os = require('os').type().toLowerCase()
  , path = require('path-os')
  , sks = require('sks')
  , uri = require('url');


exports = module.exports = function(settings, logger) {
  var pkg = pkginfo.read(require.main).package;
  var config = settings.toObject();
  var type = config.keystore || 'fs'
    , dir, vendseg, keyseg;
  
  if (type == 'fs') {
    dir = config.path;
    if (!dir) {
      vendseg = pkg.author && pkg.author.organization
              ? path.join(pkg.author.organization, pkg.name)
              : pkg.name;
      if (!(os.indexOf('win') === 0 || os.indexOf('darwin') === 0)) {
        vendseg = vendseg.toLowerCase();
      }
      keyseg = config.pathSuffix || 'keys';
      dir = path.datadir(path.join(vendseg, keyseg));
    }
    return new sks.FSKeyStore(dir);
  } else if (type == 'memory') {
    return new sks.MemoryKeyStore();
  } else {
    throw new Error('Misconfigured PKI: unsupported keystore');
  }
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
