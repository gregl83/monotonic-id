# monotonic-id

JavaScript Unique Monotonic ID Class

A unique monotonic ID class that is based on UUID version 1.

The UUID sequence is stripped of the `-` separator and is organized such that IDs are *far more likely to be sequential*.

The resulting ID can be indexed as a binary value providing a reliable format for large databases with negligible performance loss and smaller footprint than auto incremented IDs (MySQL/MariaDB binary(16) vs bigint).

For more information see the following [Percona UUID Blog Post](https://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/) which was referenced to create this package.

## Requirements

- NodeJS v0.12.x or higher
- NPM

See `./package.json`

## Installation

Source available on [GitHub](https://github.com/gregl83/monotonic-id) or install module via NPM:

    $ npm install monotonic-id

## Usage

Create instances of the monotonic-id require class.

```js
// get MID class
var MID = require('monotonic-id');

// create MID class instance
var mid = new MID();

// cast mid instance in various formats
var midID = mid.toID();
var midHex = mid.toString('hex');

// create MID class instance from ID
var midFromID = new MID(null, midID);

// create MID class instance from buffer
var midFromBuffer = new MID(null, mid._buffer);

// create MID class with node-uuid.v1 options
var mid = new MID({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678
});
```

The above first creates a instance of the monotonic-id class then casts the instance to a hex string and an id string. Following is additional functionality of monotonic-id.

That's it!

## Options

The following are the supported options for creating a new monotonic-id instance.

- `options` - (Object | null) node-uuid.v1 options for when mid is NOT supplied
  - `options.node` - (Array) Node id as Array of 6 bytes (per 4.1.6). Default: Randomly generated ID.  See note 1.
  - `options.clockseq` - (Number between 0 - 0x3fff) RFC clock sequence.  Default: An internally maintained clockseq is used.
  - `options.msecs` - (Number | Date) Time in milliseconds since unix Epoch.  Default: The current time is used.
  - `options.nsecs` - (Number between 0-9999) additional time, in 100-nanosecond units. Ignored if `msecs` is unspecified. Default: internal uuid counter is used, as per 4.2.1.2.
- `mid` - (String | Buffer) string id or buffer to cast as a monotonic-id

For more information on options checkout the [node-uuid readme](https://github.com/broofa/node-uuid).

## License

MIT
