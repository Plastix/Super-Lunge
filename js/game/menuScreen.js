define(["utils/mouseInput", "utils/utils"], function(input, utils) {

    var animated = false;
    var timer = 0;
    var titleY = -10;
    var messageY = 800;

    function draw(g) {
        g.clearRect(0, 0, utils.canvas.width, utils.canvas.height);
        g.fillStyle = "rgb(8,204,67)";
        g.fillRect(0, 0, utils.canvas.width, utils.canvas.height / 2);
        g.fillStyle = "rgb(204,8,8)";
        g.fillRect(0, utils.canvas.height / 2, utils.canvas.width, utils.canvas.height / 2);
        g.fillStyle = "rgb(255,255,255)";
        g.font = "100px BebasNeue Bold";
        g.textAlign = "center";
        g.fillText("             Lunge", utils.canvas.width / 2, titleY);
        g.font = "100px BebasNeue Light";
        g.fillText("Super             ", utils.canvas.width / 2, titleY);

        g.font = "50px BebasNeue Light";
        g.fillText("Click to play...", utils.canvas.width / 2, messageY);
    }

    function update(dt) {
        if (timer < 5) {
            if (titleY <= utils.canvas.height / 2.05)
                titleY += 15;
            if (messageY >= utils.canvas.height / 1.8)
                messageY -= 15;
        } else if (!animated) {
            animated = true;
        }
        timer += dt;
    }

    function mousePressed() {}

    return {
        draw: draw,
        update: update,
        mousePressed: mousePressed,
    };
});