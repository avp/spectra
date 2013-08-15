// Unit tests
describe('Spectra', function() {
  var color;

  beforeEach(function() {
    color = Spectra({r: 255, g: 25, b: 75, a: 0.6});
  });

  describe('Wrapper tests', function() {
    it('RGB wrapper', function() {
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(75);
      expect(color.hue()).toBe(347, 1);
      expect(color.saturation()).toBeCloseTo(0.9020, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
      expect(color.hex()).toBe('#ff194b');
      expect(color.alpha()).toBe(0.6);
    });

    it('HSV wrapper', function() {
      color = Spectra({h: 347, s: 0.9020, v: 1.000, a: 0.6});
      expect(color.hue()).toBe(347);
      expect(color.saturation()).toBeCloseTo(0.9020, 2);
      expect(color.value()).toBeCloseTo(1.000, 2);
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(75);
      expect(color.hex()).toBe('#ff194b');
      expect(color.alpha()).toBe(0.6);
      expect(color.equals(Spectra({r: 255, g: 25, b: 75, a: 0.6}))).toBe(true);
    });

    it('shorthand CSS wrapper', function() {
      color = Spectra('#4Af');
      expect(color.red()).toBe(68);
      expect(color.green()).toBe(170);
      expect(color.blue()).toBe(255);
      expect(color.hue()).toBe(207);
      expect(color.saturation()).toBeCloseTo(0.73, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
    });
    it('longhand CSS wrapper', function() {
      color = Spectra('#FF194b');
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(75);
      expect(color.hue()).toBe(347, 1);
      expect(color.saturation()).toBeCloseTo(0.9020, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
      expect(color.equals(Spectra({r: 255, g: 25, b: 75}))).toBe(true);
    });
    it('rgb CSS wrapper', function() {
      color = Spectra('rgb(255,25, 75)');
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(75);
      expect(color.hue()).toBe(347, 1);
      expect(color.saturation()).toBeCloseTo(0.9020, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
      expect(color.equals(Spectra({r: 255, g: 25, b: 75}))).toBe(true);
    });
    it('rgba CSS wrapper', function() {
      color = Spectra('rgba(255,25, 75, 0.6)');
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(75);
      expect(color.hue()).toBe(347, 1);
      expect(color.saturation()).toBeCloseTo(0.9020, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
      expect(color.alpha()).toBe(0.6);
      expect(color.equals(Spectra({r: 255, g: 25, b: 75, a: 0.6}))).toBe(true);
    });
  });

  describe('Get and set', function() {
    it('RGB get and set', function() {
      color = Spectra({r: 123, g: 192, b: 70});
      color.red(255);
      color.green(25);
      color.blue(76);
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(76);
      expect(color.hue()).toBe(347, 1);
      expect(color.saturation()).toBeCloseTo(0.9020, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
    });
    it('HSV get and set', function() {
      color = Spectra({r: 123, g: 192, b: 72});
      color.hue(346.7);
      color.saturation(0.9020);
      color.value(1.000);
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(76);
      expect(color.hue()).toBe(347, 1);
      expect(color.saturation()).toBeCloseTo(0.9020, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
    });
  });

  describe('Color operations', function() {
    it('complement', function() {
      var complement = color.complement();
      expect(complement.red()).toBe(25);
    });

    xit('lighten', function() {
      var light = color.lighten(10);
      expect(light.hex()).toBe('#ff6083');
    });
  });
});
