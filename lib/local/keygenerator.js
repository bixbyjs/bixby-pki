function KeyGenerator() {
  this._algs = {};
}

KeyGenerator.prototype.use = function(name, fn) {
  this._algs[name] = fn;
};

KeyGenerator.prototype.generate = function(options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = undefined;
  }
  options = options || {};

  var alg = options.algorithm || 'rsa';
  var fn = this._algs[alg];
  if (!fn) { throw new Error('Cryptographic algorithm "' + alg + '" is not supported'); }
  
  try {
    fn(options, cb);
  } catch (ex) {
    cb(ex);
  }
}


module.exports = KeyGenerator;
