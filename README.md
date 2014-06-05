Spectra
=======
[![Build Status](http://img.shields.io/travis/avp/spectra.svg)](https://travis-ci.org/avp/spectra)
[![Coverage Status](http://img.shields.io/coveralls/avp/spectra.svg)](https://coveralls.io/r/avp/spectra?branch=master)
[![devDependency Status](https://david-dm.org/avp/spectra/dev-status.png)](https://david-dm.org/avp/spectra#info=devDependencies)
[![npm Version](http://img.shields.io/npm/v/spectra.svg)](http://npmjs.org/package/spectra)
[![Stories in Ready](https://badge.waffle.io/avp/spectra.png?label=ready)](https://waffle.io/avp/spectra)
![GA Beacon](https://ga-beacon.appspot.com/UA-46742689-1/avp/spectra?pixel)


A small Javascript library for quickly manipulating and converting colors.

Example
-------

Spectra can be wrapped around many different types of objects to create a Spectra color that can be manipulated.

```javascript
var color = Spectra({r: 255, g: 25, b: 75});
color.red() // 255
```

Motivation
----------

The project was created to have a highly functional and lightweight way to deal with colors using Javascript, without any dependencies.

Installation
------------

Simply download [spectra.min.js](https://github.com/avp/spectra/releases/) and include it before your source files.

### Bower

The bower package is at `spectrajs`.

    bower install spectrajs

### Node

This module also works with Node. Simply run `npm install spectra` and use `var Spectra = require('spectra')` to set it up.

API Reference
-------------

Refer to http://avp.github.io/spectra for reference on how to use Spectra.

Tests
-----

There are [Jasmine](https://pivotal.github.io/jasmine) tests included in the `tests` folder. Simply run `grunt test` from the root of the repository to run the tests. This also checks JSHint. Alternatively, run `grunt` to keep watch over source and test files, and automatically rerun the tests when the files change.

### Coverage

Test coverage information can be generated by running `grunt karma`. Coverage information will be located in `test/coverage` after generation.

Building
--------

To minify Spectra, run `grunt build`.

Contributing
------------

View [CONTRIBUTING.md](https://github.com/avp/spectra/blob/master/CONTRIBUTING.md) for guidelines on how to contribute.

