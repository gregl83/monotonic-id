var uuid = require('uuid');

var idRegex = /1[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{8}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;

/**
 * Unique Monotonic ID Class
 *
 * @param {object|null} options passed to node-uuid.v1()s
 * @param {string|Buffer} mid ID or Buffer (valid ID converted to buffer)
 * @constructor
 */
function MonotonicID(options, mid) {
  this._buffer = null;
  this._hex = null;
  this._id = null;

  if (mid) {
    if (MonotonicID.isID(mid)) {
      this._id = mid;
      this._hex = mid.replace(/-+/g, '');
      mid = new Buffer(this._hex, 'hex');
    }
    if (Buffer.isBuffer(mid)) {
      this._buffer = mid;
      return this;
    }
  }

  var uuid1 = uuid.v1(options);
  this._hex = uuid1.substr(14, 4) + uuid1.substr(9, 4) + uuid1.substr(0, 8) + uuid1.substr(19, 4) + uuid1.substr(24);
  this._buffer = new Buffer(this._hex, 'hex');
}


/**
 * Test for valid ID (MID String)
 *
 * @param {string} id
 * @returns {boolean} isID
 */
MonotonicID.isID = function(id) {
  return 'string' === typeof id && idRegex.test(id);
};


/**
 * Cast as Hex string
 *
 * @returns {string} hex
 */
MonotonicID.toHex = function() {
  if (!this._hex) this._hex = Buffer.prototype.toString.call(this._buffer, 'hex');
  return this._hex;
};


/**
 * Cast as ID string
 *
 * @returns {string} id
 */
MonotonicID.prototype.toID = function() {
  if (this._id) return this._id;

  MonotonicID.toHex.call(this);

  this._id = this._hex.slice(0,4) + '-' + this._hex.slice(4,8) + '-' + this._hex.slice(8,16) + '-' + this._hex.slice(16,20) + '-' + this._hex.slice(20);

  return this._id;
};


/**
 * Cast as string
 *
 * @param {string} encoding
 * @returns {string}
 */
MonotonicID.prototype.toString = function(encoding) {
  if ('hex' === encoding) return MonotonicID.toHex.call(this);
  return Buffer.prototype.toString.call(this._buffer, encoding);
};


/**
 * Cast as buffer
 *
 * @returns {string}
 */
MonotonicID.prototype.toBuffer = function() {
  return this._buffer;
};


module.exports = MonotonicID;