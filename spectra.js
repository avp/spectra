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
// You can call many operations on the Spectra object.
var color = Spectra({r: 255, g: 25, b: 75});
var complement = color.complement();
var lighter = color.lighten(20); // Lightens color by 20%.
var darker = color.darken(25); // Darkens color by 25%.
var saturated = color.saturate(8); // Saturates color by 8%.
var desaturated = color.desaturate(10); // Desaturates color by 10%.
var grayscale = color.grayscale(); // Returns the grayscale version of the color.

// Utility Functions
// -----------------
// You can reset the value of Spectra to what it used to be by using `noConflict`, which returns
// the Spectra object itself. This is useful for renaming Spectra.
var newSpectra = Spectra.noConflict();

