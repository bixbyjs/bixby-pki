exports = module.exports = function() {
  var SelfCA = require('../lib/ca/self');
  
  var ca = new SelfCA();
  return ca;
};

exports['@implements'] = 'http://i.bixbyjs.org/pki/CertificateAuthority';
exports['@singleton'] = true;
exports['@require'] = [];
