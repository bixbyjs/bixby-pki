module.exports = function keys(id) {
  var map = {
    'keystore': './keystore',
    'rotator': './rotator',
    'boot/connection': './boot/connection',
    'boot/rotate': './boot/rotate'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};
