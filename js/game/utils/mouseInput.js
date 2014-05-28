define(["utils/utils"], function(utils) {

    var rect = utils.canvas.getBoundingClientRect();

    var mouse = {
        x: 400, //Default to starting player position
        y: 400,
        pressed: false
    };

    document.addEventListener("mousemove", function(e) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }, false);

    document.addEventListener("mousedown", function() {
        mouse.pressed = true;
    }, false);

    document.addEventListener("mouseup", function() {
        mouse.pressed = false;
    }, false);

    utils.scanvas.addEventListener('touchmove', function(e){
      mouse.x = e.touches[0].pageX - rect.left;
      mouse.y = e.touches[0].pageY - rect.top;
    }, false);

    utils.canvas.addEventListener('touchstart', function(e){
      mouse.pressed = true;
    }, false);

    utils.canvas.addEventListener('touchend', function(e){
      mouse.pressed = false;

    }, false);

    return mouse;

});