/* global describe, it, expect */

var pkg = require('..');
var MockLogger = require('mock-common').Logger;

describe('bixby-pki/generator', function() {
  
  it('should export function', function() {
    expect(pkg('generator')).to.be.a('function');
  });

  it('should generate', function(done) {
    var factory = pkg('generator');
    var gen = factory({get:function(){}},new MockLogger());
    gen(function(err,kid,key,cert){
      expect(err).to.not.exist;
      expect(cert).to.be.a('string');
      expect(key).to.be.a('string');
      expect(kid).to.be.a('string');
      expect(kid.length).to.be.equal(8);
      done();
    });
  });

  it('should config hourly kids', function(done) {
    var factory = pkg('generator');
    var gen = factory({get:function(){return {naming:'hour'};}},new MockLogger());
    gen(function(err,kid,key,cert){
      expect(err).to.not.exist;
      expect(kid.length).to.be.equal(11);
      done();
    });
  });

  it('should config epoch kids', function(done) {
    var factory = pkg('generator');
    var gen = factory({get:function(){return {naming:'epoch'};}},new MockLogger());
    gen(function(err,kid,key,cert){
      expect(err).to.not.exist;
      expect(kid.length).to.be.equal(10);
      done();
    });
  });
  
});
