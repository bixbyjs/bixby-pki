/* global describe, it, expect */

var pkg = require('..');
var MockLogger = require('mock-common').Logger;

describe('bixby-pki/keygen', function() {
  
  it('should export function', function() {
    expect(pkg('keygen')).to.be.a('function');
  });

  it('should generate', function(done) {
    var factory = pkg('keygen');
    var gen = factory({toObject:function(){return {}}},new MockLogger());
    gen(function(err,key,cert,kid){
      expect(err).to.not.exist;
      expect(cert).to.be.a('string');
      expect(key).to.be.a('string');
      expect(kid).to.be.a('string');
      expect(kid.length).to.be.equal(8);
      done();
    });
  });

  it('should config hourly kids', function(done) {
    var factory = pkg('keygen');
    var gen = factory({toObject:function(){return {naming:'hour'};}},new MockLogger());
    gen(function(err,key,cert,kid){
      expect(err).to.not.exist;
      expect(kid.length).to.be.equal(11);
      done();
    });
  });

  it('should config epoch kids', function(done) {
    var factory = pkg('keygen');
    var gen = factory({toObject:function(){return {naming:'epoch'};}},new MockLogger());
    gen(function(err,key,cert,kid){
      expect(err).to.not.exist;
      expect(kid.length).to.be.equal(10);
      done();
    });
  });
  
});
