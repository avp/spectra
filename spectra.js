// Getting Started
// ---------------
// To start using Spectra, just wrap your representation of a color with `Spectra`.
var color = Spectra({r: 255, g: 25, b: 75});
var color = Spectra({r: 255, g: 25, b: 75, a: 0.6});
var color = Spectra({h: 235, s: 0.632, v: 0.85});
var color = Spectra({h: 235, s: 1.000, l: 0.545});
var color = Spectra('#ff194b');
var color = Spectra('rgb(255, 25, 75)');
var color = Spectra('rgba(255, 25, 75, 0.6)');

// Getting and Setting Values
// --------------------------
// To get and set values, just use their respective functions.
var color = Spectra({r: 255, g: 25, b: 75});
color.red(); // Returns 255.
color.red(234);
color.red(); // Returns 234.
// You can also get and set values in different formats.
color.hex(); // Returns '#ff194b'
color.hex('#0123f4');
color.red(); // Returns 1.

// Get and set RGB values.
color.red([arg]);
color.green([arg]);
color.blue([arg]);
// Get and set HSV values.
color.hue([arg]);
color.saturationv([arg]);
color.value([arg]);
// Get and set HSL values.
color.hue([arg]);
color.saturation([arg]);
color.lightness([arg]);

// Equality
// --------
// You can compare colors by using `equals`.
var color1 = Spectra({r: 255, g: 25, b: 75});
var color2 = Spectra('#ff194b');
color1.equals(color2); // Returns true.

// Color Operations
// ----------------
// Find the complement of a color.
var complement = color.complement();
// Lightens color by 20%.
var lighter = color.lighten(20);
// Darkens color by 25%.
var darker = color.darken(25);
// Saturates color by 8%.
var saturated = color.saturate(8);
// Desaturates color by 10%.
var desaturated = color.desaturate(10);
// Makes color 10% more opaque.
var fadedIn = color.fadeIn(10);
// Makes color 10% less opaque.
var fadedOut = color.fadeOut(10);
// Returns the luma of the color, how bright it is on a screen.
var luma = color.luma();
// Returns the grayscale version of the color.
var grayscale = color.grayscale();
// Mixes the color with another Spectra instance, adding 56% of the other color to this color.
var mixed = color.mix(other, 56);

// Chaining
// --------
// You can chain together function calls.
var chained = color.complement().lighten(10);

// Utility Functions
// -----------------
// You can reset the value of Spectra to what it used to be by using `noConflict`, which returns
// the Spectra object itself. This is useful for renaming Spectra.
var newSpectra = Spectra.noConflict();
// You can get a random Spectra object by using `random`.
var randomColor = Spectra.random();
