module.exports = function keys(id) {
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
