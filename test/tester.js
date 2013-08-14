// Unit tests
describe('Spectra', function() {
  var color;

  describe('Wrapper tests', function() {
    describe('RGB Wrappers', function() {
      it('basic RGB wrappers', function() {
        color = Spectra({r: 255, g: 25, b: 76});
        expect(color.red()).toBe(255);
        expect(color.green()).toBe(25);
        expect(color.blue()).toBe(76);
      });
      it('basic HSV conversion', function() {
        color = Spectra({r: 255, g: 25, b: 76});
        expect(color.hue()).toBeCloseTo(346.7, 2);
        expect(color.saturation()).toBeCloseTo(0.9020, 2);
        expect(color.value()).toBeCloseTo(1.000, 2);
      });
    });
  });

  describe('Get and set', function() {
    it('RGB get and set', function() {
      color = Spectra({r: 123, g: 192, b: 72});
      color.red(255);
      color.green(25);
      color.blue(76);
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(76);
      expect(color.hue()).toBeCloseTo(346.7, 2);
      expect(color.saturation()).toBeCloseTo(0.9020, 2);
      expect(color.value()).toBeCloseTo(1.000, 2);
    });
  });
});
