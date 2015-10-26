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

## License

MIT
