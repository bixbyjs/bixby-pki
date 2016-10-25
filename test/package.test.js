/* global describe, it, expect */

var pkg = require('..');

describe('bixby-pki', function() {
  
  it('should export manifest', function() {
    expect(pkg).to.be.an('object');
    expect(pkg['']).to.be.a('function');
    expect(pkg['ca']).to.be.a('function');
  });
  
  describe('pki', function() {
    var main = pkg[''];
    
    it('should be annotated', function() {
      expect(main['@implements']).to.equal('http://i.bixbyjs.org/pki');
      expect(main['@singleton']).to.equal(true);
    });
  });
  
  describe('pki/ca', function() {
    var ca = pkg['ca'];
    
    it('should be annotated', function() {
      expect(ca['@implements']).to.equal('http://i.bixbyjs.org/pki/CertificateAuthority');
      expect(ca['@singleton']).to.equal(true);
    });
  });
  
});
