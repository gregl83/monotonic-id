var uuid = require('uuid')

var idRegex = /1[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{8}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i

/**
 * Unique Monotonic ID Class
 *
 * @param {object|null} [options] passed to node-uuid.v1()s
 * @param {string|Buffer} [mid] ID or Buffer (valid ID converted to buffer)
 * @constructor
 */
function MonotonicID(options, mid) {
  this._buffer = null
  this._hex = null
  this._id = null
  this._uuid = null

  if (mid) {
    if (MonotonicID.isID(mid)) {
      this._id = mid
      this._hex = mid.replace(/-+/g, '')
      mid = new Buffer(this._hex, 'hex')
    }
    if (Buffer.isBuffer(mid)) {
      this._buffer = mid
      return this
    }
  }

  this._uuid = uuid.v1(options)
  this._hex = this._uuid.substr(14, 4) + this._uuid.substr(9, 4) + this._uuid.substr(0, 8) + this._uuid.substr(19, 4) + this._uuid.substr(24)
  this._buffer = new Buffer(this._hex, 'hex')
}


/**
 * Test for valid ID (MID String)
 *
 * @param {string} id
 * @returns {boolean} isID
 */
MonotonicID.isID = function(id) {
  return 'string' === typeof id && idRegex.test(id)
}


/**
 * Cast as Hex string
 *
 * @returns {string} hex
 */
MonotonicID.toHex = function() {
  if (!this._hex) this._hex = Buffer.prototype.toString.call(this._buffer, 'hex')
  return this._hex
}


/**
 * Cast as ID string
 *
 * @returns {string} id
 */
MonotonicID.prototype.toID = function() {
  if (this._id) return this._id

  MonotonicID.toHex.call(this)

  this._id = this._hex.slice(0,4) + '-' + this._hex.slice(4,8) + '-' + this._hex.slice(8,16) + '-' + this._hex.slice(16,20) + '-' + this._hex.slice(20)

  return this._id
}


/**
 * Cast as UUID v1 string
 *
 * @returns {string} id
 */
MonotonicID.prototype.toUUID = function() {
    if (this._uuid) return this._uuid

    MonotonicID.toHex.call(this)

    this._uuid = this._hex.slice(8,16) + '-' + this._hex.slice(4,8) + '-' + this._hex.slice(0,4) + '-' + this._hex.slice(16,20) + '-' + this._hex.slice(20)

    return this._uuid
}


/**
 * Cast as string
 *
 * @param {string} encoding
 * @returns {string}
 */
MonotonicID.prototype.toString = function(encoding) {
  if ('hex' === encoding) return MonotonicID.toHex.call(this)
  return Buffer.prototype.toString.call(this._buffer, encoding)
}


/**
 * Cast as buffer
 *
 * @returns {string}
 */
MonotonicID.prototype.toBuffer = function() {
  return this._buffer
}


module.exports = MonotonicID