[![Build](https://github.com/gregl83/monotonic-id/actions/workflows/build.yml/badge.svg)](https://github.com/gregl83/monotonic-id/actions/workflows/build.yml)
[![Coverage Status](https://codecov.io/gh/gregl83/monotonic-id/graph/badge.svg?token=UK5E8AINOT)](https://codecov.io/gh/gregl83/monotonic-id)
[![NPMjs.com](https://img.shields.io/npm/v/monotonic-id.svg)](https://www.npmjs.com/package/monotonic-id)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/gregl83/expect-cookies/blob/master/LICENSE)
# monotonic-id

JavaScript Unique Monotonic ID Class

A unique monotonic ID class that is based on UUID version 1.

The UUID sequence is stripped of the `-` separator and is organized such that IDs are *far more likely to be sequential*.

The resulting ID can be indexed as a binary value providing a reliable format for large databases with negligible performance loss and smaller footprint than auto incremented IDs (MySQL/MariaDB binary(16) vs bigint).

For more information see the following [Percona UUID Blog Post](https://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/) which was referenced to create this package.

## Requirements

- NodeJS v5.0.x or higher
- NPM

See `./package.json`

## Installation

Source available on [GitHub](https://github.com/gregl83/monotonic-id) or install module via NPM:

    $ npm install monotonic-id

## Usage

Create instances of the monotonic-id require class.

```js
// get MID class
var MID = require('monotonic-id')

// create MID class instance
var mid = new MID()

// cast mid instance in various formats
var midID = mid.toID()
var midUUID = mid.toUUID()
var midHex = mid.toString('hex')
var midBuffer = mid.toBuffer()

// additional functionality

// test for valid ID
MID.isID(midID) // returns true
MID.isID(midHex) // returns false

// create MID class instance from ID
var midFromID = new MID(null, midID)

// create MID class instance from buffer
var midFromBuffer = new MID(null, midBuffer)

// create MID class with uuid.v1 options
var mid = new MID({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678
})
```

The above first creates a instance of the monotonic-id class then casts the instance to an id string and hex string.

After there are some examples of additional monotonic-id functionality.

That's it!

## Options

The following are the supported options for creating a new monotonic-id instance.

|                                  |                                                                                                                                        |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| [`options`]                      | `Object` with one or more of the following properties:                                                                                 |
| [`options.node = (random)` ]     | RFC "node" field as an `Array[6]` of byte values (per 4.1.6)                                                                           |
| [`options.clockseq = (random)`]  | RFC "clock sequence" as a `Number` between 0 - 0x3fff                                                                                  |
| [`options.msecs = (current time)`] | RFC "timestamp" field (`Number` of milliseconds, unix epoch)                                                                           |
| [`options.nsecs = 0`]            | RFC "timestamp" field (`Number` of nanoseconds to add to `msecs`, should be 0-10,000)                                                  |
| [`options.random = (random)`]    | `Array` of 16 random bytes (0-255) used to generate other fields, above                                                                |
| [`options.rng`]                  | Alternative to `options.random`, a `Function` that returns an `Array` of 16 random bytes (0-255)                                       |
| [`buffer`]                       | `Uint8Array` or `Uint8Array` subtype (e.g. Node.js `Buffer`). If provided, binary UUID is written into the array, starting at `offset` |
| [`offset` = 0]                   | `Number` Index to start writing UUID bytes in `buffer`                                                                                 |
| _returns_                        | UUID `String` if no `buffer` is specified, otherwise returns `buffer`                                                                  |
| _throws_                         | `Error` if more than 10M UUIDs/sec are requested                                                                                       |
| [`mid`]                          | `String` or `Buffer` to cast as a monotonic-id.                                                                                         |

For more information on options checkout the [uuid v1 docs](https://github.com/uuidjs/uuid/blob/v11.1.0/README_js.md#uuidv1options-buffer-offset).

## License

[MIT](LICENSE)