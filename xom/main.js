exports = module.exports = function(ca) {
  var api = {};
  
  api.requestCert = function(entity, pubKey, options, cb) {
    ca.requestCert(entity, pubKey, options, cb);
  }
  
  return api;
};

exports['@implements'] = 'http://i.bixbyjs.org/pki';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/pki/CertificateAuthority'
];
