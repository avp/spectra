// Download
// --------
// To download, check out the [Github](https://github.com/avp/spectra) page.
//
// Minified releases are on the [releases](https://github.com/avp/spectra/releases) page.

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
// All 17 standard CSS colors are supported.
var color = Spectra('teal');
// You can also use CIE Lab 1976.
var color = Spectra({l: 80, a: 30, b: 20});

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

// Strings
// -------
// You can also turn any color into a string.
color.hex();
color.rgbString();
color.rgbaString();
color.hslString();
color.hslaString();
// Also, you can get an rgb number: 0xRRGGBB
color.rgbNumber();

// Equality
// --------
// You can compare colors by using `equals`.
var color1 = Spectra({r: 255, g: 25, b: 75});
var color2 = Spectra('#ff194b');
color1.equals(color2); // Returns true.
// You can check if colors are close to each other too.
color1.near(color2, 10); // Returns true if two colors are within 10% of each other.

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
// Tests if the color is light or dark (to decide if you want light or dark text on it).
var isDark = color.isDark();
var isLight = color.isLight();
// Mixes the color with another Spectra instance, adding 56% of the other color to this color.
var mixed = color.mix(other, 56);
// [Color harmonies](http://goo.gl/R3FRlU). The second parameter is the index in the harmony you want for `color`.
// Returns a list of Spectra objects.
var harmonies = color.harmony('analogous', 0);
var harmonies = color.harmony('triad', 1);
var harmonies = color.harmony('complementary', 0);
var harmonies = color.harmony('split-complementary', 0);
var harmonies = color.harmony('square', 0);
var harmonies = color.harmony('rectangle', 0);
// Gradients. You can generate a list of colors of any length from one color to another.
var gradient = color.gradient(Spectra('#ffffff'), 10);


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
