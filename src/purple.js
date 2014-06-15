function maxIntensity(lightness, hue) {
    var intensity = 0;
    var previousIntensity, lch;
    while (true) {
        previousIntensity = intensity;
        intensity += 1;
        lch = chroma.lch(lightness, intensity, hue).lch();
        if (lch[1] < previousIntensity) {
            return chroma.lch(lightness, previousIntensity, hue);
        }
    }
}

var maxViolet = 320.0612958158414;
var maxRed = 13.269188407066501;
var purpleHue = maxViolet + ((360 + maxRed) - maxViolet) / 2;  // 346.7
var yellowGreenHue = purpleHue - 180

var hue = purpleHue;
var startLightness = 30;
var endLightness = 55;
var oppositeHue = hue + 180;
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
