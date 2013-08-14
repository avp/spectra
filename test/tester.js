// Unit tests
describe('Spectra', function() {
  var color;

  describe('Wrapper tests', function() {
    describe('RGB wrappers', function() {
      it('basic RGB wrappers', function() {
        color = Spectra({r: 255, g: 25, b: 76});
        expect(color.red()).toBe(255);
        expect(color.green()).toBe(25);
        expect(color.blue()).toBe(76);
      });
      it('basic HSV conversion', function() {
        color = Spectra({r: 255, g: 25, b: 76});
        expect(color.hue()).toBeCloseTo(346.7, 1);
        expect(color.saturation()).toBeCloseTo(0.9020, 1);
        expect(color.value()).toBeCloseTo(1.000, 1);
      });
    });

    describe('HSV wrappers', function() {
      it('basic HSV wrappers', function() {
        color = Spectra({h: 346.7, s: 0.9020, v: 1.000});
        expect(color.hue()).toBeCloseTo(346.7, 2);
        expect(color.saturation()).toBeCloseTo(0.9020, 2);
        expect(color.value()).toBeCloseTo(1.000, 2);
      });
      it('basic RGB conversion', function() {
        color = Spectra({h: 346.7, s: 0.9020, v: 1.000});
        expect(color.red()).toBe(255);
        expect(color.green()).toBe(25);
        expect(color.blue()).toBe(76);
      });
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
      expect(color.hue()).toBeCloseTo(346.7, 1);
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
      expect(color.hue()).toBeCloseTo(346.7, 1);
      expect(color.saturation()).toBeCloseTo(0.9020, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
    });
  });

  describe('Color operations', function() {
    it('complement', function() {
      color = Spectra({r: 255, g: 25, b: 76});
      var complement = color.complement();
      expect(complement.red()).toBe(25);
    });
  });
});
