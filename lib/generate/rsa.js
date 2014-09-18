/**
 * Module dependencies.
 */
var akeypair = require('akeypair');


module.exports = function(options, cb) {
  
  return akeypair(options, function(err, pair) {
    if (err) { return cb(err); }
    return cb(null, pair.private, pair.public);
  });
}
