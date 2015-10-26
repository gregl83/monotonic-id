var should = require('should');

var MID = require('../');

var idRegex = /1[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{8}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
var hexRegex = /1[0-9a-f]{3}[0-9a-f]{12}[89ab][0-9a-f]{15}/i;

var hex = '11e57c1a7dccdd008c10af47842df01b';
var id = '11e5-7c1a-7dccdd00-8c10-af47842df01b';

describe('monotonic-id class', function() {
  it('creates new mid', function(done) {
    for (var i=0; i<100; i++) {
      var mid = new MID();

      (mid).should.be.instanceOf(MID);

      (Buffer.isBuffer(mid._buffer)).should.be.true;
      (mid.toString('hex')).should.match(hexRegex);
      (mid.toID()).should.match(idRegex);
    }

    done();
  });

  it('constructs mid from id', function(done) {
    var mid = new MID(null, id);

    (mid).should.be.instanceOf(MID);

    (Buffer.isBuffer(mid._buffer)).should.be.true;
    (mid.toString('hex')).should.be.eql(hex);
    (mid.toID()).should.be.eql(id);

    done();
  });
});