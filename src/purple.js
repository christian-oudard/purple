function maxIntensity(lightness, hue) {

    hue = (hue + 360) % 360;

    var inGamut = function(l, c, h) {
        // Check for divergence of the color during a round-trip conversion.
        var err = 0.1;
        var lch = chroma.lch(l, c, h).lch();
        return (
            Math.abs(lch[0] - l) < err &&
            Math.abs(lch[1] - c) < err &&
            Math.abs(lch[2] - h) < err
        );
    };

    var search = function(lo, hi) {
        var mid = (lo + hi) / 2;
        if ( (hi - lo) < 0.1 ) {
            return mid;
        }
        if ( inGamut(lightness, mid, hue) ) {
            return search(mid, hi);
        } else {
            return search(lo, mid);
        }
    }

    return chroma.lch(lightness, search(0, 100), hue);
}

var maxViolet = 320.0612958158414;
var maxRed = 13.269188407066501;
var purpleHue = maxViolet + ((360 + maxRed) - maxViolet) / 2;  // 346.7
var yellowGreenHue = purpleHue - 180

var hue = purpleHue;
var startLightness = 30;
var endLightness = 55;
var oppositeHue = (hue + 180) % 360;
var startBg = maxIntensity(startLightness, hue);
var startFg = maxIntensity(startLightness, oppositeHue);
var endBg = maxIntensity(endLightness, oppositeHue);
var endFg = maxIntensity(endLightness, hue);

$(document).ready(function() {
    var circle = document.getElementById('circle');

    document.body.style.backgroundColor = startBg;
    circle.style.fill = startFg;

    $('body').keydown(function(e) {
        if (e.keyCode == 32) { // space bar
            document.body.style.backgroundColor = endBg;
            circle.style.fill = endFg;
        }
    });

    alert('Stare at the circle without moving your eyes for about a minute. When the edges of the circle seem to disappear, press the space bar without moving your eyes. The colors will switch, and you will see intense purple.');
});
