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
  var Util = {};

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

  Util.hsvToRgb = function(hsv) {
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

  Util.hslToRgb = function(hsl) {
    var h = hsl.h;
    var s = hsl.s;
    var l = hsl.l;
    var hsv = {};
    hsv.h = h;
    s *= (l < 0.5) ? l : 1 - l;
    hsv.s = 2 * s / (l + s);
    hsv.v = l + s;
    console.log(hsv);
    return Util.hsvToRgb(hsv);
  };

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
    throw TypeError(css + ' is not a valid CSS string for Spectra.');
  };

  /** Normalization of the Spectra object. */
  Util.normalize = function(arg) {
    arg.a = arg.a || 1;

    var color = arg;

    if (color.hsv !== undefined) {
      color = Util.hsvToRgb(color.hsv);
      color.a = arg.a || 1;
    } else if (color.hsl !== undefined) {
      color = Util.hslToRgb(color.hsl);
      color.a = arg.a || 1;
    } else if (color.css !== undefined) {
      color = Util.parseCss(color.css);
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
    if (color.alpha !== undefined) {
      color.a = color.alpha;
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
        this.color = Util.normalize({r: arg.r, g: arg.g, b: arg.b, a: arg.a});
      }
      if (arg.v !== undefined || arg.value !== undefined) {
        this.color = Util.normalize({hsv: arg, a: arg.a});
      }
      if (arg.l !== undefined || arg.lightness !== undefined) {
        this.color = Util.normalize({hsl: arg, a: arg.a});
      }
    } else if (typeof arg == 'string') {
      this.color = Util.normalize({css: arg});
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
      this.color = Util.normalize(color);
      return this;
    } else {
      return Math.round(color.r);
    }
  };
  Spectra.prototype.green = function(arg) {
    var color = this.color;
    if (arg) {
      color.g = arg;
      this.color = Util.normalize(color);
      return this;
    } else {
      return Math.round(color.g);
    }
  };
  Spectra.prototype.blue = function(arg) {
    var color = this.color;
    if (arg) {
      color.b = arg;
      this.color = Util.normalize(color);
      return this;
    } else {
      return Math.round(color.b);
    }
  };
  Spectra.prototype.hue = function(arg) {
    var color = Util.rgbToHsv(this.color);
    if (arg) {
      color.h = arg;
      this.color = Util.normalize({hsv: color});
      return this;
    } else {
      return Math.round(color.h);
    }
  };
  Spectra.prototype.saturationv = function(arg) {
    var color = Util.rgbToHsv(this.color);
    if (arg) {
      color.s = arg;
      this.color = Util.normalize({hsv: color});
      return this;
    } else {
      return color.s;
    }
  };
  Spectra.prototype.value = function(arg) {
    var color = Util.rgbToHsv(this.color);
    if (arg) {
      color.v = arg;
      this.color = Util.normalize({hsv: color});
      return this;
    } else {
      return color.v;
    }
  };
  Spectra.prototype.saturation = function(arg) {
    var color = Util.rgbToHsl(this.color);
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
      this.color = Util.normalize({css: arg});
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
   * Returns the complement of this color.
   */
  Spectra.prototype.complement = function() {
    var newColor = new Spectra(this.color);
    newColor.hue((newColor.hue() + 180) % 360);
    return newColor;
  };

  /**
   * Lightens or darkens a color based on a percentage value.
   * Percentage should be passed in as an integer, so 40 would lighten the color 40%.
   */
  Spectra.prototype.shade = function(percentage) {
    var newColor = new Spectra(this.color).color;
    var amount = Math.round(2.55 * percentage);
    newColor.red(newColor.r + amount);
    newColor.green(newColor.g + amount);
    newColor.blue(newColor.b + amount);
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
   * Calculates the luminosity of the color, i.e. how it appears on screen.
   */
  Spectra.prototype.luminosity = function() {
    return (2 * this.red()) + (5 * this.green()) + (1 * this.blue());
  };

  /**
   * Returns a Spectra object, which is the grayscale of the current color.
   */
  Spectra.prototype.grayscale = function() {
    return new Spectra({
      r: this.luminosity(),
      g: this.luminosity(),
      b: this.luminosity(),
      a: this.alpha()
    });
  };

  /**
   * Returns the color that results from mixing percent of the other color into this color.
   */
  Spectra.prototype.mix = function(other, percentage) {
    var p = percentage / 100 || 0.5;
    return new Spectra({
      r: this.red() * (1 - p) + other.red() * p,
      g: this.green() * (1 - p) + other.green() * p,
      b: this.blue() * (1 - p) + other.blue() * p,
      a: this.alpha() * (1 - p) + other.alpha() * p
    });
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
  spectraWrapper.noConflict = function() {
    root.Spectra = oldSpectra;
    return spectraWrapper;
  };

  // Set the global variable Spectra to the wrapper that we have defined.
  root.Spectra = spectraWrapper;
}).call(this);
