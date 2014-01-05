/**!
 * Spectra.js
 *
 * Wrapping a value with Spectra() returns a Spectra object.
 *
 * The object's color value is as follows:
 * {
 *   r: 0 to 255 [int], // Red
 *   g: 0 to 255 [int], // Green
 *   b: 0 to 255 [int], // Blue
 *   a: 0 to 1 [float] // Alpha
 * }
 */

(function() {
  'use strict';

  // Keep track of the global object.
  var root = this;

  // Store the old value of Spectra to reassign in case of a call to noConflict.
  var oldSpectra = root.Spectra;

  // Utility functions for use in Spectra.
  var Util = {};

  // All official predefined css colors.
  var predefinedColors = {
    "AliceBlue": "#F0F8FF",
    "AntiqueWhite": "#FAEBD7",
    "Aqua": "#00FFFF",
    "Aquamarine": "#7FFFD4",
    "Azure": "#F0FFFF",
    "Beige": "#F5F5DC",
    "Bisque": "#FFE4C4",
    "Black": "#000000",
    "BlanchedAlmond": "#FFEBCD",
    "Blue": "#0000FF",
    "BlueViolet": "#8A2BE2",
    "Brown": "#A52A2A",
    "BurlyWood": "#DEB887",
    "CadetBlue": "#5F9EA0",
    "Chartreuse": "#7FFF00",
    "Chocolate": "#D2691E",
    "Coral": "#FF7F50",
    "CornflowerBlue": "#6495ED",
    "Cornsilk": "#FFF8DC",
    "Crimson": "#DC143C",
    "Cyan": "#00FFFF",
    "DarkBlue": "#00008B",
    "DarkCyan": "#008B8B",
    "DarkGoldenRod": "#B8860B",
    "DarkGray": "#A9A9A9",
    "DarkGreen": "#006400",
    "DarkKhaki": "#BDB76B",
    "DarkMagenta": "#8B008B",
    "DarkOliveGreen": "#556B2F",
    "DarkOrange": "#FF8C00",
    "DarkOrchid": "#9932CC",
    "DarkRed": "#8B0000",
    "DarkSalmon": "#E9967A",
    "DarkSeaGreen": "#8FBC8F",
    "DarkSlateBlue": "#483D8B",
    "DarkSlateGray": "#2F4F4F",
    "DarkTurquoise": "#00CED1",
    "DarkViolet": "#9400D3",
    "DeepPink": "#FF1493",
    "DeepSkyBlue": "#00BFFF",
    "DimGray": "#696969",
    "DodgerBlue": "#1E90FF",
    "FireBrick": "#B22222",
    "FloralWhite": "#FFFAF0",
    "ForestGreen": "#228B22",
    "Fuchsia": "#FF00FF",
    "Gainsboro": "#DCDCDC",
    "GhostWhite": "#F8F8FF",
    "Gold": "#FFD700",
    "GoldenRod": "#DAA520",
    "Gray": "#808080",
    "Green": "#008000",
    "GreenYellow": "#ADFF2F",
    "HoneyDew": "#F0FFF0",
    "HotPink": "#FF69B4",
    "IndianRed": " #CD5C5C",
    "Indigo": " #4B0082",
    "Ivory": "#FFFFF0",
    "Khaki": "#F0E68C",
    "Lavender": "#E6E6FA",
    "LavenderBlush": "#FFF0F5",
    "LawnGreen": "#7CFC00",
    "LemonChiffon": "#FFFACD",
    "LightBlue": "#ADD8E6",
    "LightCoral": "#F08080",
    "LightCyan": "#E0FFFF",
    "LightGoldenRodYellow": "#FAFAD2",
    "LightGray": "#D3D3D3",
    "LightGreen": "#90EE90",
    "LightPink": "#FFB6C1",
    "LightSalmon": "#FFA07A",
    "LightSeaGreen": "#20B2AA",
    "LightSkyBlue": "#87CEFA",
    "LightSlateGray": "#778899",
    "LightSteelBlue": "#B0C4DE",
    "LightYellow": "#FFFFE0",
    "Lime": "#00FF00",
    "LimeGreen": "#32CD32",
    "Linen": "#FAF0E6",
    "Magenta": "#FF00FF",
    "Maroon": "#800000",
    "MediumAquaMarine": "#66CDAA",
    "MediumBlue": "#0000CD",
    "MediumOrchid": "#BA55D3",
    "MediumPurple": "#9370DB",
    "MediumSeaGreen": "#3CB371",
    "MediumSlateBlue": "#7B68EE",
    "MediumSpringGreen": "#00FA9A",
    "MediumTurquoise": "#48D1CC",
    "MediumVioletRed": "#C71585",
    "MidnightBlue": "#191970",
    "MintCream": "#F5FFFA",
    "MistyRose": "#FFE4E1",
    "Moccasin": "#FFE4B5",
    "NavajoWhite": "#FFDEAD",
    "Navy": "#000080",
    "OldLace": "#FDF5E6",
    "Olive": "#808000",
    "OliveDrab": "#6B8E23",
    "Orange": "#FFA500",
    "OrangeRed": "#FF4500",
    "Orchid": "#DA70D6",
    "PaleGoldenRod": "#EEE8AA",
    "PaleGreen": "#98FB98",
    "PaleTurquoise": "#AFEEEE",
    "PaleVioletRed": "#DB7093",
    "PapayaWhip": "#FFEFD5",
    "PeachPuff": "#FFDAB9",
    "Peru": "#CD853F",
    "Pink": "#FFC0CB",
    "Plum": "#DDA0DD",
    "PowderBlue": "#B0E0E6",
    "Purple": "#800080",
    "Red": "#FF0000",
    "RosyBrown": "#BC8F8F",
    "RoyalBlue": "#4169E1",
    "SaddleBrown": "#8B4513",
    "Salmon": "#FA8072",
    "SandyBrown": "#F4A460",
    "SeaGreen": "#2E8B57",
    "SeaShell": "#FFF5EE",
    "Sienna": "#A0522D",
    "Silver": "#C0C0C0",
    "SkyBlue": "#87CEEB",
    "SlateBlue": "#6A5ACD",
    "SlateGray": "#708090",
    "Snow": "#FFFAFA",
    "SpringGreen": "#00FF7F",
    "SteelBlue": "#4682B4",
    "Tan": "#D2B48C",
    "Teal": "#008080",
    "Thistle": "#D8BFD8",
    "Tomato": "#FF6347",
    "Turquoise": "#40E0D0",
    "Violet": "#EE82EE",
    "Wheat": "#F5DEB3",
    "White": "#FFFFFF",
    "WhiteSmoke": "#F5F5F5",
    "Yellow": "#FFFF00",
    "YellowGreen": "#9ACD32"
  }

  /**
   * Clamps x to be between lower and upper, inclusive.
   * If not specified, lower and upper are 0 and 1 respectively.
   * If x is outside the range lower to upper, the closest of lower or upper is used.
   */
  Util.clamp = function(x, lower, upper) {
    lower = lower !== undefined ? lower : 0;
    upper = upper !== undefined ? upper : 1;
    return Math.max(lower, Math.min(upper, x));
  };

  /**
   * Converts from RGB to HSV.
   * RGB should have keys r, g, b.
   * HSV will have keys h, s, v.
   */
  Util.rgbToHsv = function(rgb) {
    var hsv = {};
    var r = Number(rgb.r || 0) / 255;
    var g = Number(rgb.g || 0) / 255;
    var b = Number(rgb.b || 0) / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;

    hsv.v = max;
    if (hsv.v === 0) {
      hsv.h = 0;
      hsv.s = 0;
    } else {
      hsv.s = (max - min) / max;
      if (hsv.s === 0) {
        hsv.h = 0;
      } else {
        if (max === r) {
          hsv.h = (g - b) / delta;
        } else if (max === g) {
          hsv.h = 2 + (b - r) / delta;
        } else {
          hsv.h = 4 + (r - g) / delta;
        }
        hsv.h *= 60;
        if (hsv.h < 0) {
          hsv.h += 360;
        }
      }
    }

    return hsv;
  };

  /**
   * Converts from HSV to RGB.
   * HSV should have keys h, s, v.
   * RGB will have keys r, g, b.
   */
  Util.hsvToRgb = function(hsv) {
    var rgb = {r: 0, g: 0, b: 0};

    var h = Util.clamp(Number(hsv.h || 0), 0, 360);
    var s = Util.clamp(Number(hsv.s || 0));
    var v = Util.clamp(Number(hsv.v || 0));
    var chroma = s * v;
    var sector = h / 60; // Sector of the color wheel.
    var x = chroma * (1 - Math.abs((sector % 2) - 1));

    if(sector < 1) {
      rgb.r = chroma;
      rgb.g = x;
    } else if (sector < 2) {
      rgb.r = x;
      rgb.g = chroma;
    } else if (sector < 3) {
      rgb.g = chroma;
      rgb.b = x;
    } else if (sector < 4) {
      rgb.g= x;
      rgb.b = chroma;
    } else if (sector < 5) {
      rgb.r = x;
      rgb.b = chroma;
    } else if (sector <= 6) {
      rgb.r = chroma;
      rgb.b = x;
    }

    var min = v - chroma;

    rgb.r += min;
    rgb.g += min;
    rgb.b += min;

    rgb.r *= 255;
    rgb.g *= 255;
    rgb.b *= 255;

    return rgb;
  };

  /**
   * Converts from RGB to HSL.
   * RGB should have keys r, g, b.
   * HSL will have keys h, s, l.
   */
  Util.rgbToHsl = function(rgb) {
    var hsv = Util.rgbToHsv(rgb);
    var hsl = {};
    hsl.h = hsv.h;
    hsl.l = (2 - hsv.s) * hsv.v;
    hsl.s = hsv.s * hsv.v;
    hsl.s /= (hsl.l <= 1) ? (hsl.l) : (2 - hsl.l);
    hsl.l /= 2;
    return hsl;
  };

  /**
   * Converts from HSL to RGB.
   * HSL should have keys h, s, l.
   * RGB will have keys r, g, b.
   */
  Util.hslToRgb = function(hsl) {
    var h = Util.clamp(hsl.h, 0, 360);
    var s = Util.clamp(hsl.s);
    var l = Util.clamp(hsl.l);
    var hsv = {};
    hsv.h = h;
    s *= (l < 0.5) ? l : 1 - l;
    hsv.s = (2 * s) / (l + s);
    hsv.v = l + s;
    return Util.hsvToRgb(hsv);
  };

  /**
   * Converts from CSS to RGB.
   */
  Util.parseCss = function(css) {
    var color = {};
    var shorthandRegex = /^#[0-9a-f]{3}$/i;
    var shorthandMatch = css.match(shorthandRegex);
    if (shorthandMatch) {
      color = {
        r: parseInt(css.charAt(1), 16) * 0x11,
        g: parseInt(css.charAt(2), 16) * 0x11,
        b: parseInt(css.charAt(3), 16) * 0x11
      };
      return Util.normalize(color);
    }
    var longhandRegex = /^#[0-9a-f]{6}$/i;
    var longhandMatch = css.match(longhandRegex);
    if (longhandMatch) {
      color = {
        r: parseInt(css.slice(1,3), 16),
        g: parseInt(css.slice(3,5), 16),
        b: parseInt(css.slice(5,7), 16)
      };
      return Util.normalize(color);
    }
    var rgbRegex = /^rgb\(\s*([0-9]+),\s*([0-9]+),\s*([0-9]+)\s*\)$/i;
    var rgbMatch = css.match(rgbRegex);
    if (rgbMatch) {
      color = {
        r: parseInt(rgbMatch[1], 10),
        g: parseInt(rgbMatch[2], 10),
        b: parseInt(rgbMatch[3], 10)
      };
      return Util.normalize(color);
    }
    var rgbaRegex = /^rgba\(\s*([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([0-9\.]+)\s*\)$/i;
    var rgbaMatch = css.match(rgbaRegex);
    if (rgbaMatch) {
      color = {
        r: parseInt(rgbaMatch[1], 10),
        g: parseInt(rgbaMatch[2], 10),
        b: parseInt(rgbaMatch[3], 10),
        a: parseFloat(rgbaMatch[4], 10)
      };
      return Util.normalize(color);
    }

    // If we can't parse it, we throw a TypeError.
    throw new TypeError(css + ' is not a valid CSS string for Spectra.');
  };

  /**
   * Converts a predefined color string to a Spectra object
   * Eg Util.parsePredefinedColor('white') === Spectra('#ffffff') === Spectra('{r: 255, g: 255, b: 255}');
   */
  Util.parsePredefinedColor = function (string) {
    return new Spectra.fn(predefinedColors[string]);
  };

  /**
   * Performs any conversions necessary to turn the arg into a Spectra object.
   */
  Util.normalize = function(arg) {
    arg.a = arg.a || 1;

    var color = arg;

    // Perform conversions if necessary.
    if (color.hsv !== undefined) {
      color = Util.hsvToRgb(color.hsv);
      color.a = arg.a || 1;
    } else if (color.hsl !== undefined) {
      color = Util.hslToRgb(color.hsl);
      color.a = arg.a || 1;
    } else if (color.css !== undefined) {
      color = Util.parseCss(color.css);
    }

    // Convert any full words into the abbreviated versions.
    color.r = color.red || color.r;
    color.g = color.green || color.g;
    color.b = color.blue || color.b;
    color.a = color.alpha || color.a;

    // Place all values in a valid range.
    color.r = Util.clamp(color.r, 0, 255);
    color.g = Util.clamp(color.g, 0, 255);
    color.b = Util.clamp(color.b, 0, 255);
    color.a = Util.clamp(color.a, 0, 1);

    return color;
  };

  /**
   * Constructor for Spectra object.
   * @constructor
   */
  var Spectra = function(arg) {
    return new Spectra.fn(arg);
  };

  Spectra.fn = function(arg) {
    if (arg === null || arg === undefined) {
      throw new TypeError('Spectra argument must be defined.');
    }
    if (typeof arg === 'object') {
      if (arg.r !== undefined || arg.red !== undefined) {
        this.color = Util.normalize({r: arg.r, g: arg.g, b: arg.b, a: arg.a});
      }
      if (arg.v !== undefined || arg.value !== undefined) {
        this.color = Util.normalize({hsv: arg, a: arg.a});
      }
      if (arg.l !== undefined || arg.lightness !== undefined) {
        this.color = Util.normalize({hsl: arg, a: arg.a});
      }
    } else if (typeof arg === 'string') {
      if (arg.toLowerCase() in predefinedColors) {
        return Util.parsePredefinedColor(arg);
      }
      this.color = Util.normalize({css: arg});
    } else {
      throw new TypeError('Spectra argument ' + arg + ' is invalid.');
    }
    return this;
  };

  /**
   * Get and set.
   * These functions take an optional argument.
   * If it is specified, the property is changed and the object is returned.
   * Otherwise, the property value is returned.
   */
  Spectra.fn.prototype.red = function(arg) {
    var color = this.color;
    if (arguments.length) {
      color.r = arg;
      this.color = Util.normalize(color);
      return this;
    } else {
      return Math.round(color.r);
    }
  };
  Spectra.fn.prototype.green = function(arg) {
    var color = this.color;
    if (arguments.length) {
      color.g = arg;
      this.color = Util.normalize(color);
      return this;
    } else {
      return Math.round(color.g);
    }
  };
  Spectra.fn.prototype.blue = function(arg) {
    var color = this.color;
    if (arguments.length) {
      color.b = arg;
      this.color = Util.normalize(color);
      return this;
    } else {
      return Math.round(color.b);
    }
  };
  Spectra.fn.prototype.hue = function(arg) {
    var color = Util.rgbToHsv(this.color);
    if (arguments.length) {
      color.h = arg;
      this.color = Util.normalize({hsv: color, a: this.color.a});
      return this;
    } else {
      return Math.round(color.h);
    }
  };
  Spectra.fn.prototype.saturationv = function(arg) {
    var color = Util.rgbToHsv(this.color);
    if (arguments.length) {
      color.s = arg;
      this.color = Util.normalize({hsv: color, a: this.color.a});
      return this;
    } else {
      return color.s;
    }
  };
  Spectra.fn.prototype.value = function(arg) {
    var color = Util.rgbToHsv(this.color);
    if (arguments.length) {
      color.v = arg;
      this.color = Util.normalize({hsv: color, a: this.color.a});
      return this;
    } else {
      return color.v;
    }
  };
  Spectra.fn.prototype.saturation = function(arg) {
    var color = Util.rgbToHsl(this.color);
    if (arguments.length) {
      color.s = arg;
      this.color = Util.normalize({hsl: color, a: this.color.a});
      return this;
    } else {
      return color.s;
    }
  };
  Spectra.fn.prototype.lightness = function(arg) {
    var color = Util.rgbToHsl(this.color);
    if (arguments.length) {
      color.l = arg;
      this.color = Util.normalize({hsl: color, a: this.color.a});
      return this;
    } else {
      return color.l;
    }
  };
  Spectra.fn.prototype.alpha = function(arg) {
    var color = this.color;
    if (arguments.length) {
      color.a = arg;
      return this;
    } else {
      return color.a;
    }
  };

  Spectra.fn.prototype.hex = function() {
    // Pad the strings so that they are all 2 digits long, and concatenate.
    var rString = ('0' + this.red().toString(16)).slice(-2);
    var gString = ('0' + this.green().toString(16)).slice(-2);
    var bString = ('0' + this.blue().toString(16)).slice(-2);
    return '#' + rString + gString + bString;
  };

  Spectra.fn.prototype.rgbaString = function() {
    return 'rgba(' + this.red() + ',' + this.green() + ',' + this.blue() + ',' + this.alpha() + ')';
  };

  Spectra.fn.prototype.hslString = function() {
    return 'hsl(' + this.hue() + ',' + this.saturation() + ',' +
                    (Math.round(this.lightness()*100) / 100) + ')';
  };

  Spectra.fn.prototype.hslaString = function() {
    return 'hsla(' + this.hue() + ',' + this.saturation() + ',' +
                     (Math.round(this.lightness()*100) / 100) + ',' +
                     this.alpha() + ')';
  };

  Spectra.fn.prototype.rgbNumber = function() {
    return (this.red() << 16) | (this.green() << 8) | (this.blue());
  };

  /**
   * API Functions
   * =============
   *
   * Below are any API functions that do not modify the current color, but return values based
   * on the current color. As such, use red(), green(), etc. instead of actually accessing this.color.
   */

  /**
   * Tests to see if this color is equal to other.
   * Because other is also a color, it follows that we can simply compare red, green, blue, and alpha
   * to see if the colors are equal.
   */
  Spectra.fn.prototype.equals = function(other) {
    var color1 = this;
    var color2 = other;

    if (arguments.length < 1) {
      return color1 === color2;
    }

    return color1.red() === color2.red() &&
           color1.green() === color2.green() &&
           color1.blue() === color2.blue() &&
           color1.alpha() === color2.alpha();
  };

  /**
   * Returns the complement of this color.
   */
  Spectra.fn.prototype.complement = function() {
    var newColor = new Spectra(this.color);
    newColor.hue((newColor.hue() + 180) % 360);
    return newColor;
  };

  /**
   * Negates this color.
   * For a color {R, G, B}, returns a new color {R', G', B'}, where R' = 255 - R and so on.
   */
  Spectra.fn.prototype.negate = function() {
    var newColor = new Spectra(this.color);
    newColor.red(255 - newColor.red());
    newColor.green(255 - newColor.green());
    newColor.blue(255 - newColor.blue());
    return newColor;
  };

  /**
   * Lightens or darkens a color based on a percentage value.
   * Percentage should be passed in as an integer, so 40 would lighten the color 40%.
   */
  Spectra.fn.prototype.shade_ = function(percentage) {
    var newColor = new Spectra(this.color);
    newColor.lightness(newColor.lightness() + (percentage / 100));
    return newColor;
  };

  /**
   * Lightens a color based on percentage value from 1 to 100.
   */
  Spectra.fn.prototype.lighten = function(percentage) {
    return this.shade_(percentage);
  };

  /**
   * Darkens a color based on percentage value from 1 to 100.
   */
  Spectra.fn.prototype.darken = function(percentage) {
    return this.shade_(-percentage);
  };

  /**
   * Adds saturation to the color based on a percentage value.
   */
  Spectra.fn.prototype.saturate = function(percentage) {
    var p = percentage / 100;
    var newColor = new Spectra(this.color);
    newColor.saturation(newColor.saturation() + p);
    return newColor;
  };

  /**
   * Desaturates the color based on a percentage value.
   */
  Spectra.fn.prototype.desaturate = function(percentage) {
    var p = percentage / 100;
    var newColor = new Spectra(this.color);
    newColor.saturation(newColor.saturation() - p);
    return newColor;
  };

  /**
   * Fades in the current color based on a percentage value, making it less transparent.
   */
  Spectra.fn.prototype.fadeIn = function(percentage) {
    var p = percentage / 100;
    var newColor = new Spectra(this.color);
    newColor.alpha(newColor.alpha() + p);
    return newColor;
  };

  /**
   * Fades out the current color based on a percentage value, making it less transparent.
   */
  Spectra.fn.prototype.fadeOut = function(percentage) {
    var p = percentage / 100;
    var newColor = new Spectra(this.color);
    newColor.alpha(newColor.alpha() - p);
    return newColor;
  };

  /**
   * Calculates the luma of the color, i.e. how it appears on screen.
   */
  Spectra.fn.prototype.luma = function() {
    return (0.2126 * this.red()) + (0.7152 * this.green()) + (0.0722 * this.blue());
  };

  /**
   * Returns a Spectra object, which is the grayscale of the current color.
   */
  Spectra.fn.prototype.grayscale = function() {
    return this.desaturate(100);
  };

  /**
   * Returns the color that results from mixing percent of the other color into this color.
   */
  Spectra.fn.prototype.mix = function(other, percentage) {
    var p = arguments.length < 2 ? 0.5 : percentage / 100;
    return new Spectra({
      r: this.red() * (1 - p) + other.red() * p,
      g: this.green() * (1 - p) + other.green() * p,
      b: this.blue() * (1 - p) + other.blue() * p,
      a: this.alpha() * (1 - p) + other.alpha() * p
    });
  };

  /**
   * Returns a gradient of colors approximately from this color to the other, consisting of n colors.
   */
  Spectra.fn.prototype.gradient = function(other, n) {
    var gradient = [];
    var r = this.red();
    var g = this.green();
    var b = this.blue();
    var dr = (other.red() - this.red()) / (n - 1);
    var dg = (other.green() - this.green()) / (n - 1);
    var db = (other.blue() - this.blue()) / (n - 1);

    for (var i = 0; i < n; i++) {
      gradient.push(new Spectra({r: r, g: g, b: b}));
      r += dr;
      g += dg;
      b += db;
    }

    return gradient;
  };

  /**
   * Restores the old value of Spectra and returns the wrapper function.
   */
  Spectra.noConflict = function() {
    root.Spectra = oldSpectra;
    return Spectra;
  };

  /**
   * Generates a random color.
   */
  Spectra.random = function() {
    return new Spectra({
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255)
    });
  };

  // Set the global variable Spectra to the wrapper that we have defined.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined') {
      exports = module.exports = Spectra;
    }
    exports.Spectra = Spectra;
  } else {
    root.Spectra = Spectra;
  }

}).call(this);