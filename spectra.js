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
    "white": "#ffffff",
    "silver": "#c0c0c0",
    "gray": "#808080",
    "black": "#000000",
    "red": "#ff0000",
    "maroon": "#800000",
    "yellow": "#ffff00",
    "olive": "#808000",
    "lime": "#00ff00",
    "green": "#008000",
    "aqua": "#00ffff",
    "teal": "#008080",
    "blue": "#0000ff",
    "navy": "#000080",
    "fuschia": "#ff00ff",
    "purple": "#800080",
    "orange": "#ffa500"
  };

  /**
   * Clamps x to be between lower and upper, inclusive.
   * If not specified, lower and upper are 0 and 1 respectively.
   * If x is outside the range lower to upper, the closest of lower or upper is used.
   */
  Util.clamp = function(x, lower, upper) {
    x = x || 0;
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

    var h = Util.clamp((hsv.h || hsv.hue), 0, 360);
    var s = Util.clamp((hsv.s || hsv.saturation), 0, 1);
    var v = Util.clamp(hsv.v || hsv.value);
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
    } else {
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

    if (isNaN(hsl.s)) {
      hsl.s = 0;
    }
    return hsl;
  };

  /**
   * Converts from HSL to RGB.
   * HSL should have keys h, s, l.
   * RGB will have keys r, g, b.
   */
  Util.hslToRgb = function(hsl) {
    var h = Util.clamp((hsl.h || hsl.hue), 0, 360);
    var s = Util.clamp(hsl.s || hsl.saturation);
    var l = Util.clamp(hsl.l || hsl.lightness);
    var hsv = {};
    hsv.h = h;
    s *= (l < 0.5) ? l : 1 - l;
    hsv.s = (2 * s) / (l + s);
    hsv.v = l + s;
    return Util.hsvToRgb(hsv);
  };

  /**
   * Turns an rgb color into a LAB color.
   */
  Util.rgbToLab = function(rgb) {
    // RGB to XYZ
    rgb = {
      r: rgb.r / 255,
      g: rgb.g / 255,
      b: rgb.b / 255
    };

    var xyz, tc;

    for (tc in rgb) {
      if (rgb[tc] > 0.04045) {
        rgb[tc] = Math.pow(((rgb[tc] + 0.055) / 1.055), 2.4);
      } else {
        rgb[tc] /= 12.92;
      }

      rgb[tc] = rgb[tc] * 100;
    }

    xyz = {
      x: rgb.r * 0.4124 + rgb.g * 0.3576 + rgb.b * 0.1805,
      y: rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722,
      z: rgb.r * 0.0193 + rgb.g * 0.1192 + rgb.b * 0.9505
    };

    // XYZ to LAB

    var xyz2 = {};
    var white = {
      x: 95.047,
      y: 100.000,
      z: 108.883
    };

    for (tc in xyz) {
      xyz2[tc] = xyz[tc] / white[tc];

      if (xyz2[tc] > 0.008856) {
        xyz2[tc] = Math.pow(xyz2[tc], (1 / 3));
      } else {
        xyz2[tc] = (7.787 * xyz2[tc]) + (16 / 116);
      }
    }

    return {
      l: 116 * xyz2.y - 16,
      a: 500 * (xyz2.x - xyz2.y),
      b: 200 * (xyz2.y - xyz2.z)
    };
  };

  /**
   * Converts an lab color to rgb.
   */
  Util.labToRgb = function(lab) {
    var xyz = {};
    var rgb = {};

    // LAB to XYZ
    xyz.y = ((lab.l || lab.L) + 16) / 116;
    xyz.x = lab.a / 500 + xyz.y;
    xyz.z = xyz.y - lab.b / 200;

    if (Math.pow(xyz.y,3) > 0.008856) {
      xyz.y = Math.pow(xyz.y,3);
    } else {
      xyz.y = (xyz.y - 16 / 116) / 7.787;
    }

    if (Math.pow(xyz.x,3) > 0.008856) {
      xyz.x = Math.pow(xyz.x,3);
    } else {
      xyz.x = (xyz.x - 16 / 116) / 7.787;
    }

    if (Math.pow(xyz.z,3) > 0.008856) {
      xyz.z = Math.pow(xyz.z,3);
    } else {
      xyz.z = (xyz.z - 16 / 116) / 7.787;
    }

    //  Observer= 2degree, Illuminant= D65
    xyz.x *=  95.047 / 100;
    xyz.y *= 100.000 / 100;
    xyz.z *= 108.883 / 100;

    //  XYZ to RGB
    rgb.r = xyz.x *  3.2406 + xyz.y * -1.5372 + xyz.z * -0.4986;
    rgb.g = xyz.x * -0.9689 + xyz.y *  1.8758 + xyz.z *  0.0415;
    rgb.b = xyz.x *  0.0557 + xyz.y * -0.2040 + xyz.z *  1.0570;

    if (rgb.r > 0.0031308) {
      rgb.r = 1.055 * Math.pow(rgb.r, (1 / 2.4)) - 0.055;
    } else {
      rgb.r *= 12.92;
    }

    if (rgb.g > 0.0031308) {
      rgb.g = 1.055 * Math.pow(rgb.g, (1 / 2.4)) - 0.055;
    } else {
      rgb.g *= 12.92;
    }

    if (rgb.b > 0.0031308) {
      rgb.b = 1.055 * Math.pow(rgb.b, (1 / 2.4)) - 0.055;
    } else {
      rgb.b *= 12.92;
    }

    rgb.r = Util.clamp(rgb.r * 255, 0, 255);
    rgb.g = Util.clamp(rgb.g * 255, 0, 255);
    rgb.b = Util.clamp(rgb.b * 255, 0, 255);

    return rgb;
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
        a: parseFloat(rgbaMatch[4])
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
      color.a = arg.a;
    } else if (color.hsl !== undefined) {
      color = Util.hslToRgb(color.hsl);
      color.a = arg.a;
    } else if (color.css !== undefined) {
      color = Util.parseCss(color.css);
    } else if (color.lab !== undefined) {
      color = Util.labToRgb(color.lab);
      color.a = arg.a;
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
    if (arg instanceof Spectra.fn) {
      return arg;
    }
    if (typeof arg === 'object') {
      if (arg.r !== undefined || arg.red !== undefined) {
        this.color = Util.normalize({r: arg.r, g: arg.g, b: arg.b, a: arg.a});
      } else if (arg.v !== undefined || arg.value !== undefined) {
        this.color = Util.normalize({hsv: arg, a: arg.a});
      } else if ((arg.l !== undefined || arg.lightness !== undefined) &&
        (arg.s !== undefined || arg.saturation !== undefined)) {
        this.color = Util.normalize({hsl: arg, a: (arg.a || arg.alpha)});
      } else if ((arg.l !== undefined || arg.L !== undefined) && (arg.a !== undefined)) {
        this.color = Util.normalize({lab: arg, a: (arg.a || arg.alpha)});
      } else {
        throw new TypeError('Spectra argument ' + arg + ' is invalid.');
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

  Spectra.fn.prototype.labObject = function() {
    return Util.rgbToLab(this.color);
  };

  /**
   * Use hex string function for toString() operations
   * to allow direct assignment to CSS properties
   */
  Spectra.fn.prototype.toString = Spectra.fn.prototype.hex;

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

    return color1.near(color2, 0);
  };

  /**
   * Tests to see if an other color is within a percentage range of this color.
   */
  Spectra.fn.prototype.near = function(other, percentage) {
    var color1 = this;
    var color2 = other;

    percentage = Math.abs(percentage || 0);
    var adjustment = 255 * (percentage / 100);

    return (Math.abs(color2.red() - color1.red()) <= adjustment) &&
           (Math.abs(color2.green() - color1.green()) <= adjustment) &&
           (Math.abs(color2.blue() - color1.blue()) <= adjustment) &&
           (Math.abs(color2.alpha() - color1.alpha()) <= (percentage / 100));
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
   * Lightens a color based on percentage value from 1 to 100.
   */
  Spectra.fn.prototype.lighten = function(percentage) {
    var newColor = new Spectra(this.color);
    var l = Util.clamp(newColor.lightness() + (percentage / 100), 0, 1);
    newColor.lightness(l);
    return newColor;
  };

  /**
   * Darkens a color based on percentage value from 1 to 100.
   */
  Spectra.fn.prototype.darken = function(percentage) {
    return this.lighten(-percentage);
  };

  /**
   * Lightens or darkens a color based on a random value in the specified range.
   * Percentage should be passed in as an integer, so 40 would lighten or darken up to 40%.
   */
  Spectra.fn.prototype.randomColorRange = function(percentage) {
    var adjustment = ((Math.random() * 2) - 1) * percentage;
    var newColor = new Spectra(this.color);
    newColor = newColor.lighten(adjustment);
    return newColor;
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
   * If a color is dark then it's best to have white text on it.
   * http://24ways.org/2010/calculating-color-contrast
   */
  Spectra.fn.prototype.isDark = function() {
    var yiq = ((this.red()*299)+(this.green()*587)+(this.blue()*144))/1000;
    return yiq < 131.5;
  };

  /**
   * If a color is light then it's best to have black text on it.
   */
  Spectra.fn.prototype.isLight = function() {
    return !this.isDark();
  };

  /**
   * Returns the color that results from mixing percent of the other color into this color.
   */
  Spectra.fn.prototype.mix = function(other, percentage) {
    other = new Spectra(other);
    var p = arguments.length < 2 ? 0.5 : percentage / 100;
    return new Spectra({
      r: this.red() * (1 - p) + other.red() * p,
      g: this.green() * (1 - p) + other.green() * p,
      b: this.blue() * (1 - p) + other.blue() * p,
      a: this.alpha() * (1 - p) + other.alpha() * p
    });
  };

  /**
   * Returns a number from 0 to 1 representing the color contrast between the two colors.
   */
  Spectra.fn.prototype.contrast = function(other) {
    other = new Spectra(other);
    var diff = Math.max(this.red(), other.red()) - Math.min(this.red(), other.red()) +
               Math.max(this.green(), other.green()) - Math.min(this.green(), other.green()) +
               Math.max(this.blue(), other.blue()) - Math.min(this.blue(), other.blue());
    return diff / 765;
  };

  /**
   * Returns a gradient of colors approximately from this color to the other, consisting of n colors.
   */
  Spectra.fn.prototype.gradient = function(other, n) {
    other = new Spectra(other);
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
   * Harmony
   *
   * @desc Returns an array of harmonious colors (goo.gl/R3FRlU).
   * @author Benjamin Fleming (benjamminf)
   * @since 2014-01-06
   * @param type (string) - Type of harmony.
   * @param index (int) - At which point the original color exists on the set harmonies. Since
   *   some types of color harmonies have inconsistent offsets (eg. rectangle) it's useful to
   *   note where this original color lies on the set harmony hues.
   * @return Array of Spectra instances.
   */
  Spectra.fn.prototype.harmony = function(type, index) {
    index = typeof index === 'number' ? Math.abs(parseInt(index, 10)) : 0;

    var colors = [];
    var hsv = Util.rgbToHsv(this.color);
    var hues = [0, 180];

    switch (type) {
      case 'analogous':
        hues = [0, 30, 60];
        break;
      case 'triad':
        hues = [0, 120, 240];
        break;
      case 'split-complementary':
        hues = [0, 150, 210];
        break;
      case 'rectangle':
        hues = [0, 60, 180, 240];
        break;
      case 'square':
        hues = [0, 90, 180, 270];
        break;
      case 'complementary':
        hues = [0, 180];
        break;
    }

    var n = hues.length;
    var offset = hues[index % n];

    for (var i = 0; i < n; i++) {
      colors.push(new Spectra({
        h: (hsv.h + hues[i] - offset) % 360,
        s:  hsv.s,
        v:  hsv.v,
        a: this.color.a
      }));
    }

    return colors;
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
