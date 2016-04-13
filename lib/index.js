exports = module.exports = function pki(id) {
  var map = {
    //'': './main',
    'keygen': './keygen',
    'keystore': './keystore',
    'rotator': './rotator',
    'rsa/keygen': './rsa/keygen',
    'boot/rotate': './boot/rotate'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};


exports.scope = function(id, obj, $scope) {
  if (id == 'settings') {
    var prefix = $scope.prefix || 'pki';
    if ($scope.options && $scope.options['#']) {
      prefix = $scope.options['#'];
    }
    return obj.isolate(prefix);
  }
  
  return obj;
}
