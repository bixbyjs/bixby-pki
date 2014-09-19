exports = module.exports = function keys(id) {
  var map = {
    'keystore': './keystore',
    'rotator': './rotator',
    'generator': './generator',
    'boot/connection': './boot/connection',
    'boot/rotate': './boot/rotate'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};


exports.scope = function(id, obj, $scope) {
  if (id == 'settings') {
    var prefix = 'pki';
    if ($scope.options && $scope.options.block) {
      prefix = $scope.options.block;
    } else if ($scope.prefix != '/') {
      prefix = $scope.prefix;
    }
    return obj.isolate(prefix);
  }
  
  return obj;
}
