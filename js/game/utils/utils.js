define(function() {

    var canvas = document.getElementById("stage");

    function circle(g, x, y, r) {
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2, false);
        g.fill();
    }

    function dist(x1, y1, x2, y2) {
        return Math.sqrt(Math.abs((x1 -= x2) * x1 + (y1 -= y2) * y1));
    }

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Return an object for Require JS
    return {
        dist: dist,
        canvas: canvas,
        circle: circle,
        getRandom: getRandom,
    };

});