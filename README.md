Spectra
=======

Spectra is a Javascript library for quickly manipulating and converting colors.

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

Simply download [spectra.min.js](https://github.com/aakpat6/spectra/releases/download/v0.1.0-beta.1/spectra.min.js) and include it before your source files.

API Reference
-------------

Refer to http://aakpat6.github.io/spectra for reference on how to use Spectra.

Tests
-----

There are [Jasmine](https://pivotal.github.io/jasmine) tests included in the `tests` folder. Simply run `grunt test` from the root of the repository to run the tests. This also checks JSHint. Alternatively, run `grunt` to keep watch over source and test files, and automatically rerun the tests when the files change.

Building
--------

To minify Spectra, run `grunt build`.

Contributing
------------

To develop for this project, you should first install [Node.js](http://nodejs.org/), which includes the Node Package Manager. Running `npm install` will install any necessary packages.

You should also install [Grunt](http://gruntjs.com/) by running `npm install -g grunt-cli`.

Take care to maintain the existing code style. Make sure to add tests in the `test/tester.js` file for any new features that you add. Make sure to run `grunt test` before submitting. Any code that doesn't pass all unit tests will not be accepted.
