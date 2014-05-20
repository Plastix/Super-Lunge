require(["gameScreen"], function(gameScreen) {

    //TODO: 
    // Different types of enemies
    // Menu/Death screen!
    // Score text (floating)
    // requestAnimationFrame polyfill by Erik Möller. Fixes from Paul Irish and Tino Zijdel
    // MIT license
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
     
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
     
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    var canvas = document.getElementById("stage");;
    var surface = canvas.getContext("2d");;
    var currentScreen = gameScreen;

    canvas.setAttribute("width", 800);
    canvas.setAttribute("height", 800);
    canvas.setAttribute("style", "border:0px; padding:0px; margin:0px");

    function start() {
        var lastFrame = Date.now();

        function loop() {
            var thisFrame = Date.now();
            var dt = (thisFrame - lastFrame) / 1000; //Convert deltatime from milliseconds to seconds
            window.requestAnimationFrame(loop);
            currentScreen.update(dt);
            currentScreen.draw(surface);
            lastFrame = thisFrame;
        }

        loop();
    }

    // Call methods on current screen for mouse actions
    document.addEventListener("mousedown", function() {
        currentScreen.mousePressed();
    }, false);

    document.addEventListener("mouseUp", function() {
        currentScreen.mouseReleased();
    }, false);

    currentScreen.load(surface);
    start();

});