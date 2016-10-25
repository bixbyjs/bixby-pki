var forge = require('node-forge');


function SelfCertificateAuthority() {
  
}

SelfCertificateAuthority.prototype.requestCert = function(entity, pubKey, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = undefined;
  }
  options = options || {};
  
  console.log('REQUEST CERT!');
  console.log(entity);
  console.log(pubKey);
  console.log(options);
  
  var cert = forge.pki.createCertificate();
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notBefore.setTime(cert.validity.notBefore.getTime()-10000); // allow for some clock skew
  //cert.validity.notAfter = opts.cert.expire;
  if(!cert.validity.notAfter)
  {
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 1);
  }
  cert.setExtensions([{
    name: 'basicConstraints',
    cA: true
  }, {
    name: 'keyUsage',
    keyCertSign: true,
    digitalSignature: true,
    nonRepudiation: true,
    keyEncipherment: true,
    dataEncipherment: true
  }, {
    name: 'extKeyUsage',
    serverAuth: true,
    clientAuth: true,
    codeSigning: true,
    emailProtection: true,
    timeStamping: true
  }]);
  cert.publicKey = forge.pki.publicKeyFromPem(pubKey);
  cert.sign(forge.pki.privateKeyFromPem(options.key));

  return cb(null, forge.pki.certificateToPem(cert));
}


module.exports = SelfCertificateAuthority;
