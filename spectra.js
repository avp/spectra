/**
 * Spectra.js
 *
 * Wrapping a value with Spectra() returns a Spectra object.
 *
 * The object's color value is as follows:
 * {
 *   r: 0 to 255 [int],
 *   g: 0 to 255 [int],
 *   b: 0 to 255 [int],
 *   a: 0 to 1 [float] // Alpha
 * }
 */

 (function() {
  // Keep track of the global object (generally window).
  var root = this;

  // Store the old value of Spectra to reassign in case of noConflict.
  var oldSpectra = root.Spectra;

  // Conversion functions between different formats.
  var rgbToHsv = function(rgb) {
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

  var hsvToRgb = function(hsv) {
    var rgb = {r: 0, g: 0, b: 0};

    var h = Number(hsv.h || 0);
    var s = Number(hsv.s || 0);
    var v = Number(hsv.v || 0);
    var chroma = s * v;
    var hDash = h / 60;
    var x = chroma * (1 - Math.abs((hDash % 2) - 1));

    if(hDash < 1.0) {
      rgb.r = chroma;
      rgb.g = x;
    } else if (hDash < 2) {
      rgb.r = x;
      rgb.g = chroma;
    } else if (hDash < 3) {
      rgb.g = chroma;
      rgb.b = x;
    } else if (hDash < 4) {
      rgb.g= x;
      rgb.b = chroma;
    } else if (hDash < 5) {
      rgb.r = x;
      rgb.b = chroma;
    } else if (hDash <= 6) {
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

  var parseCss = function(css) {
    var color = {};
    var shorthandRegex = /^#[0-9a-f]{3}$/i;
    var shorthandMatch = css.match(shorthandRegex);
    if (shorthandMatch) {
      color = {
        r: parseInt(css.charAt(1), 16) * 0x11,
        g: parseInt(css.charAt(2), 16) * 0x11,
        b: parseInt(css.charAt(3), 16) * 0x11
      };
      return normalize(color);
    }
    var longhandRegex = /^#[0-9a-f]{6}$/i;
    var longhandMatch = css.match(longhandRegex);
    if (longhandMatch) {
      color = {
        r: parseInt(css.slice(1,3), 16),
        g: parseInt(css.slice(3,5), 16),
        b: parseInt(css.slice(5,7), 16)
      };
      return normalize(color);
    }
    var rgbRegex = /^rgb\(\s*([0-9]+),\s*([0-9]+),\s*([0-9]+)\s*\)$/i;
    var rgbMatch = css.match(rgbRegex);
    if (rgbMatch) {
      color = {
        r: parseInt(rgbMatch[1], 10),
        g: parseInt(rgbMatch[2], 10),
        b: parseInt(rgbMatch[3], 10)
      };
      return normalize(color);
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
      return normalize(color);
    }

    // If we can't parse it, we throw a `TypeError`.
    throw TypeError(css + ' is not a valid CSS string for Spectra.');
  };

  /** Normalization functions */
  var normalize = function(arg) {
    var color = arg;

    if (color.hsv !== undefined) {
      color = hsvToRgb(color.hsv);
    } else if (color.css !== undefined) {
      color = parseCss(color.css);
    }

    if (color.red !== undefined) {
      color.r = color.red;
    }
    if (color.green !== undefined) {
      color.g = color.green;
    }
    if (color.blue !== undefined) {
      color.b = color.blue;
    }

    if (color.r > 255) {
      color.r = 255;
    }
    if (color.g > 255) {
      color.g = 255;
    }
    if (color.b > 255) {
      color.b = 255;
    }
    if (color.a > 1) {
      color.a = 1;
    }

    if (color.r < 0) {
      color.r = 0;
    }
    if (color.g < 0) {
      color.g = 0;
    }
    if (color.b < 0) {
      color.b = 0;
    }
    if (color.a < 0) {
      color.a = 0;
    }

    color.a = color.a || 1;
    return color;
  };

  /**
   * Constructor
   */
  var Spectra = function(arg) {
    if (arg === null || arg === undefined) {
      throw new TypeError('Spectra argument must be defined.');
    }
    if (typeof arg == 'object') {
      if (arg.r !== undefined || arg.red !== undefined) {
        this.color = normalize({r: arg.r, g: arg.g, b: arg.b, a: arg.a});
      }
      if (arg.v !== undefined || arg.value !== undefined) {
        this.color = normalize({hsv: arg, a: arg.a});
      }
    } else if (typeof arg == 'string') {
      this.color = normalize({css: arg});
    }
    return this;
  };

  /**
   * Get and set.
   * These functions take an optional argument.
   * If it is specified, the property is changed and the object is returned.
   * Otherwise, the property value is returned.
   */
  Spectra.prototype.red = function(arg) {
    var color = this.color;
    if (arg) {
      color.r = arg;
      this.color = normalize(color);
      return this;
    } else {
      return Math.round(color.r);
    }
  };
  Spectra.prototype.green = function(arg) {
    var color = this.color;
    if (arg) {
      color.g = arg;
      this.color = normalize(color);
      return this;
    } else {
      return Math.round(color.g);
    }
  };
  Spectra.prototype.blue = function(arg) {
    var color = this.color;
    if (arg) {
      color.b = arg;
      this.color = normalize(color);
      return this;
    } else {
      return Math.round(color.b);
    }
  };
  Spectra.prototype.hue = function(arg) {
    var color = rgbToHsv(this.color);
    if (arg) {
      color.h = arg;
      this.color = normalize({hsv: color});
      return this;
    } else {
      return Math.round(color.h);
    }
  };
  Spectra.prototype.saturation = function(arg) {
    var color = rgbToHsv(this.color);
    if (arg) {
      color.s = arg;
      this.color = normalize({hsv: color});
      return this;
    } else {
      return color.s;
    }
  };
  Spectra.prototype.value = function(arg) {
    var color = rgbToHsv(this.color);
    if (arg) {
      color.v = arg;
      this.color = normalize({hsv: color});
      return this;
    } else {
      return color.v;
    }
  };
  Spectra.prototype.alpha = function(arg) {
    var color = this.color;
    if (arg) {
      color.a = arg;
      return this;
    } else {
      return color.a;
    }
  };
  Spectra.prototype.hex = function(arg) {
    if (arg) {
      this.color = normalize({css: arg});
    } else {
      var r = this.red();
      var g = this.green();
      var b = this.blue();

      // Pad the strings so that they are all 2 digits long, and concatenate.
      var rString = ('00' + r.toString(16)).slice(-2);
      var gString = ('00' + g.toString(16)).slice(-2);
      var bString = ('00' + b.toString(16)).slice(-2);
      return '#' + rString + gString + bString;
    }
  };

  /**
   * Returns the complement of this color.
   */
  Spectra.prototype.complement = function() {
    var hsv = rgbToHsv(this.color);
    var newHsv = {s: hsv.s, v: hsv.v};
    newHsv.h = (hsv.h + 180) % 360;
    return new Spectra(newHsv);
  };

  /**
   * Lightens or darkens a color based on a percentage value.
   * Percentage should be passed in as an integer, so 40 would lighten the color 40%.
   */
  Spectra.prototype.shade = function(percentage) {
    var newColor = new Spectra(this.color);
    var amount = Math.round(2.55 * percentage);
    newColor.red(newColor.red() + amount);
    newColor.green(newColor.green() + amount);
    newColor.blue(newColor.blue() + amount);
    return newColor;
  };

  /**
   * Lightens a color based on percentage value.
   */
  Spectra.prototype.lighten = function(percentage) {
    return this.shade(percentage);
  };

  /**
   * Darkens a color based on percentage value.
   */
  Spectra.prototype.darken = function(percentage) {
    return this.shade(-percentage);
  };

  /**
   * Tests to see if this color is equal to other.
   * Because other is also a color, it follows that we can simply compare red, green, and blue
   * to see if the colors are equal.
   */
  Spectra.prototype.equals = function(other) {
    color1 = this;
    color2 = other;

    return color1.red() === color2.red() &&
           color1.green() === color2.green() &&
           color1.blue() === color2.blue() &&
           color1.alpha() === color2.alpha();
  };

  /**
   * Wrapper
   */
  var spectraWrapper = function(arg) {
    return new Spectra(arg);
  };

  /**
   * Restores the old value of Spectra and returns the wrapper function.
   */
  Spectra.noConflict = function() {
    root.Spectra = oldSpectra;
    return spectraWrapper;
  };

  // Set the global variable Spectra to the wrapper that we have defined.
  root.Spectra = spectraWrapper;
}).call(this);
