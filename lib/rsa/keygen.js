exports = module.exports = function() {
  // Load modules.
  var akeypair = require('akeypair');
  
  return function(options, cb) {
    akeypair(options, function(err, pair) {
      if (err) { return cb(err); }
      return cb(null, pair.private, pair.public);
    });
  };
};


exports['@require'] = [ '' ];

exports['@implements'] = 'http://i.bixbyjs.org/pki/keygenFunc';
exports['@algorithm'] = [ 'rsa' ];
