/**
 * Spectra.js
 *
 * Wrapping a value with Spectra() returns a Spectra object.
 *
 * The object's color value is as follows:
 * {
 *   rgb: {
 *     r: 0 to 255,
 *     g: 0 to 255,
 *     b: 0 to 255,
 *   }
 *   hsv: {
 *     h: 0 to 360,
 *     s: 0 to 1,
 *     v: 0 to 1
 *   }
 *   a: 0 to 1 // Alpha
 * }
 */

 (function() {
  var root = this;
  var oldSpectra = root.Spectra;

  /** Conversion functions between formats. */
  var rgbToHsv = function(rgb) {
    var hsv = {};
    var r = Number(rgb.r || rgb.red || 0) / 255;
    var g = Number(rgb.g || rgb.green || 0) / 255;
    var b = Number(rgb.b || rgb.blue || 0) / 255;
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
      color.rgb = {
        r: parseInt(css.charAt(1), 16) * 0x11,
        g: parseInt(css.charAt(2), 16) * 0x11,
        b: parseInt(css.charAt(3), 16) * 0x11
      };
      return normalize(color);
    }
    var longhandRegex = /^#[0-9a-f]{6}$/i;
    var longhandMatch = css.match(longhandRegex);
    if (longhandMatch) {
      color.rgb = {
        r: parseInt(css.slice(1,3), 16),
        g: parseInt(css.slice(3,5), 16),
        b: parseInt(css.slice(5,7), 16)
      };
      return normalize(color);
    }
    var rgbRegex = /^rgb\(\s*([0-9]+),\s*([0-9]+),\s*([0-9]+)\s*\)$/i;
    var rgbMatch = css.match(rgbRegex);
    if (rgbMatch) {
      color.rgb = {
        r: parseInt(rgbMatch[1], 10),
        g: parseInt(rgbMatch[2], 10),
        b: parseInt(rgbMatch[3], 10)
      };
      return normalize(color);
    }
  };

  /** Normalization functions */
  var normalize = function(arg) {
    var color = arg;
    color.a = color.a || 1;

    if (color.rgb !== undefined) {
      color.hsv = rgbToHsv(color.rgb);
    } else if (color.hsv !== undefined) {
      color.rgb = hsvToRgb(color.hsv);
    } else if (color.css !== undefined) {
      return parseCss(color.css);
    }

    if (color.rgb.red !== undefined) {
      color.rgb.r = color.rgb.red;
    }
    if (color.rgb.green !== undefined) {
      color.rgb.g = color.rgb.green;
    }
    if (color.rgb.blue !== undefined) {
      color.rgb.b = color.rgb.blue;
    }

    return color;
  };

  /** Wrapper */
  var Spectra = function(arg) {
    if (typeof arg == 'object') {
      if (arg.r !== undefined || arg.red !== undefined) {
        this.color = normalize({rgb: arg});
      }
      if (arg.v !== undefined || arg.value !== undefined) {
        this.color = normalize({hsv: arg});
      }
    } else if (typeof arg == 'string') {
      this.color = normalize({css: arg});
    }
    return this;
  };

  /** Getters and Setters */
  Spectra.prototype.red = function(arg) {
    var color = this.color;
    if (arg) {
      color.rgb.r = arg;
      this.color = normalize({rgb: color.rgb});
      return this;
    } else {
      return Math.round(color.rgb.r);
    }
  };
  Spectra.prototype.green = function(arg) {
    var color = this.color;
    if (arg) {
      color.rgb.g = arg;
      this.color = normalize({rgb: color.rgb});
      return this;
    } else {
      return Math.round(color.rgb.g);
    }
  };
  Spectra.prototype.blue = function(arg) {
    var color = this.color;
    if (arg) {
      color.rgb.b = arg;
      this.color = normalize({rgb: color.rgb});
      return this;
    } else {
      return Math.round(color.rgb.b);
    }
  };

  Spectra.prototype.hue = function(arg) {
    var color = this.color;
    if (arg) {
      color.hsv.h = arg;
      this.color = normalize({hsv: color.hsv});
      return this;
    } else {
      return Math.round(color.hsv.h);
    }
  };
  Spectra.prototype.saturation = function(arg) {
    var color = this.color;
    if (arg) {
      color.hsv.s = arg;
      this.color = normalize({hsv: color.hsv});
      return this;
    } else {
      return color.hsv.s;
    }
  };
  Spectra.prototype.value = function(arg) {
    var color = this.color;
    if (arg) {
      color.hsv.v = arg;
      this.color = normalize({hsv: color.hsv});
      return this;
    } else {
      return color.hsv.v;
    }
  };

  /** Complement function */
  Spectra.prototype.complement = function() {
    var hsv = this.color.hsv;
    var newHsv = {s: hsv.s, v: hsv.v};
    newHsv.h = (hsv.h + 180) % 360;
    return new Spectra(newHsv);
  };

  /** Wrapper */
  var spectraWrapper = function(arg) {
    return new Spectra(arg);
  };

  Spectra.noConflict = function() {
    root.Spectra = oldSpectra;
    return this;
  };

  root.Spectra = spectraWrapper;
}).call(this);
