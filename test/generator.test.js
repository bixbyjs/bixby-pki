/* global describe, it, expect */

var pkg = require('..');

describe('bixby-pki/generator', function() {
  
  it('should export function', function() {
    expect(pkg('generator')).to.be.a('function');
  });

  it('should generate', function(done) {
    var factory = pkg('generator');
    var gen = factory({get:function(){}});
    gen(function(err,pair){
      expect(err).to.not.exist;
      expect(pair).to.be.an('object');
      expect(pair.public).to.be.a('string');
      expect(pair.private).to.be.a('string');
      done();
    });
  });
  
});
