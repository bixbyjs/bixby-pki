/* global describe, it, expect */

var pkg = require('..');
var sks = require('sks');
var MockLogger = require('mock-common').Logger;

describe.skip('bixby-pki/rotator', function() {
  
  it('should export function', function() {
    expect(pkg('rotator')).to.be.a('function');
  });

  it('should start memory rotation', function(done) {
    var factory = pkg('rotator');
    var store = new sks.MemoryKeyStore();
    var config = {toObject:function(){return {}}};
    var logger = new MockLogger();
    var keygen = pkg('keygen')(config,logger);
    var rotator = factory(keygen, store, config, logger);
    expect(rotator).to.be.an('object');
    expect(rotator.start).to.be.a('function');
    rotator.start(function(err){
      expect(err).to.not.exist;
      store.get(function(err, kid, key, cert, meta){
        expect(err).to.not.exist;
        expect(kid).to.be.a('string');
        expect(key.length).to.be.above(1500);
        expect(cert.length).to.be.above(400);
        done();
      });
    });
  });

  it('should rotate on filesystem too', function(done) {
    var factory = pkg('rotator');
    var tmp = '/tmp/bixby-test/'+Math.random();
    var store = new sks.FSKeyStore(tmp);
    var config = {toObject:function(){return {}}};
    var logger = new MockLogger();
    var keygen = pkg('keygen')(config,logger);
    var rotator = factory(keygen, store, config, logger);
    expect(rotator).to.be.an('object');
    expect(rotator.start).to.be.a('function');
    rotator.start(function(err){
      expect(err).to.not.exist;
      store.get(function(err, kid, key, cert, meta){
        expect(err).to.not.exist;
        expect(kid).to.be.a('string');
        expect(key.length).to.be.above(1500);
        expect(cert.length).to.be.above(400);
        // make sure we error and don't over-write
        rotator.rotate(function(err){
          expect(err).to.exist;
          done();
        });
      });
    });
  });
  
});
