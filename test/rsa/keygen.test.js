/* global describe, it, expect */

var forge = require('node-forge');
var factory = require('../../lib/rsa/keygen');


describe('rsa/keygen', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  describe('keygen function', function() {
    var keygen = factory();
    
    // TODO: Set longer timeout for default 2048 bit key
    
    describe('with 1024 bit key', function() {
      var key, cert;
      
      before(function(done) {
        keygen({ bits: 1024 }, function(err, _pair) {
          if (err) { return done(err); }
          key = _pair.privateKey;
          cert = _pair.publicKey;
          done();
        });
      });
      
      it('should generate private key', function() {
        expect(key).to.be.a('string');
        expect(key.indexOf('-----BEGIN RSA PRIVATE KEY-----')).to.equal(0);
      });
      
      it('should generate public key', function() {
        expect(cert).to.be.a('string');
        expect(cert.indexOf('-----BEGIN PUBLIC KEY-----')).to.equal(0);
        
        //var parsed = forge.pki.publicKeyFromPem(cert);
        var parsed = forge.asn1.fromDer(cert);
        console.log(parsed)
        
      });
    });
  });
  
});
