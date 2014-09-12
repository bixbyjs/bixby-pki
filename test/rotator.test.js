/* global describe, it, expect */

var pkg = require('..');
var sks = require('sks');

describe('bixby-pki/rotator', function() {
  
  it('should export function', function() {
    expect(pkg('rotator')).to.be.a('function');
  });

  it('should start rotation', function(done) {
    var factory = pkg('rotator');
    var store = new sks.MemoryKeyStore();
    var config = {get:function(){}};
    var logger = console;
    var generator = pkg('generator')(config,logger);
    var rotator = factory(generator, store, config, logger);
    expect(rotator).to.be.an('object');
    expect(rotator.start).to.be.a('function');
    rotator.start(function(err){
      expect(err).to.not.exist;
      done();
    });
  });
  
});
