var should = require('should')

var MID = require('../')

var hexRegex = /1[0-9a-f]{3}[0-9a-f]{12}[89ab][0-9a-f]{15}/i
var hex = '11e57c1a7dccdd008c10af47842df01b'

var idRegex = /1[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{8}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
var id = '11e5-7c1a-7dccdd00-8c10-af47842df01b'

var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
var uuid = '7dccdd00-7c1a-11e5-8c10-af47842df01b'

var buffer = new Buffer(hex, 'hex')
var base64 = 'EeV8Gn3M3QCMEK9HhC3wGw==';

describe('monotonic-id class', () => {
  it('creates new mid', done => {
    for (var i=0; i<100; i++) {
      var mid = new MID();

      (mid).should.be.instanceOf(MID);

      (Buffer.isBuffer(mid._buffer)).should.be.true;
      (mid._buffer).should.be.eql(mid.toBuffer());

      (mid.toString('hex')).should.match(hexRegex);
      (mid._hex).should.match(hexRegex);

      (mid.toID()).should.match(idRegex);
      (mid._id).should.match(idRegex);

      (mid.toUUID()).should.match(uuidRegex);
      (mid._uuid).should.match(uuidRegex);
    }

    done()
  })

  it('tests if id is valid', done => {
    var mid = new MID();

    (MID.isID(id)).should.be.true;
    (MID.isID(hex)).should.be.false;
    (MID.isID(mid)).should.be.false;
    (MID.isID(uuid)).should.be.false;

    done()
  })

  it('constructs mid from id', done => {
    var mid = new MID(null, id);

    (mid).should.be.instanceOf(MID);

    (Buffer.isBuffer(mid._buffer)).should.be.true;
    (mid._buffer).should.be.eql(mid.toBuffer());

    (mid.toString('hex')).should.be.eql(hex);
    (mid.toString('hex')).should.match(hexRegex);
    (mid._hex).should.match(hexRegex);

    (mid.toID()).should.be.eql(id);
    (mid.toID()).should.match(idRegex);
    (mid._id).should.match(idRegex);

    (mid.toUUID()).should.be.eql(uuid);
    (mid.toUUID()).should.match(uuidRegex);
    (mid._uuid).should.match(uuidRegex);

    done()
  })

  it('constructs mid from buffer', done => {
    var mid = new MID(null, buffer);

    (mid).should.be.instanceOf(MID);

    (Buffer.isBuffer(mid._buffer)).should.be.true;
    (mid._buffer).should.be.eql(mid.toBuffer());

    (mid.toString('hex')).should.be.eql(hex);
    (mid.toString('hex')).should.match(hexRegex);
    (mid._hex).should.match(hexRegex);

    (mid.toID()).should.be.eql(id);
    (mid.toID()).should.match(idRegex);
    (mid._id).should.match(idRegex);

    (mid.toUUID()).should.be.eql(uuid);
    (mid.toUUID()).should.match(uuidRegex);
    (mid._uuid).should.match(uuidRegex);

    done()
  })

  it('encodes using native toString functionality', done => {
      var mid = new MID(null, buffer);

      (mid.toString('base64')).should.be.eql(base64);

    done()
  })
})