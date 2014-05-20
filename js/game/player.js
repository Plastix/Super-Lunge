define(["utils/mouseInput", "utils/utils", "../lib/Vector2D"], function(mouse, utils) {

    // Constructor
    function Player() {
        // Instance variables
        this.pos = new Vector2D(400, 400);
        this.oldPos = new Vector2D(0, 0);
        this.vel = new Vector2D(0, 0);
        this.lunging = false;
        this.speed = 5;
        this.lunging_speed = 25;
        this.lunging_time = 0.4; //Time in seconds
        this.cooldown_time = 0.3;
        this.timer = this.cooldown_time;
        this.angle = 0;
    }

    Player.prototype.draw = function(g) {
        if (this.lunging) { // Draw a streak while lunging
            g.strokeStyle = "rgba(255,255,255," + (this.lunging_time - this.timer) + ")";
            g.lineWidth = 6;
            g.beginPath();
            g.moveTo(this.pos.x, this.pos.y);
            g.lineTo(this.oldPos.x, this.oldPos.y);
            g.closePath();
            g.stroke();
        }
        g.fillStyle = "rgb(8,204,67)";
        utils.circle(g, this.pos.x, this.pos.y, 15);
        g.fillStyle = "rgb(41,163,78)";
        utils.circle(g, this.pos.x, this.pos.y, 10);

        // Draw the arrow that points towards mouse
        g.fillStyle = "rgba(255,255,255,0.5)";
        g.save();
        g.translate(this.pos.x, this.pos.y);
        g.rotate(this.angle);
        g.beginPath();
        g.moveTo(-10, -20);
        g.lineTo(0, -30);
        g.lineTo(10, -20);
        g.lineTo(0, -50);
        g.fill();
        g.translate(-this.pos.x, -this.pos.y);
        g.restore();
    };

    Player.prototype.update = function(dt) {
        if (!this.lunging) {
            this.vel = new Vector2D(mouse.x, mouse.y);
            this.vel.subtractEquals(this.pos);
            this.vel.unitEquals();
            this.vel.multiplyEquals(this.speed);
            this.angle = Math.atan2(mouse.x - this.pos.x, this.pos.y - mouse.y); // Update angle for aiming triangle
        } else {
            this.vel.multiplyEquals(0.9); // Ease velocity vector while lunging
            if (this.timer > this.lunging_time)
                this.lunging = false;
        }

        if (utils.dist(this.pos.x, this.pos.y, mouse.x, mouse.y) > 5 || this.lunging) {
            this.pos.addEquals(this.vel);
        }

        if (this.pos.x > utils.canvas.width - 15) // Check canvas boundaries
            this.pos.x = utils.canvas.width - 15;
        else if (this.pos.x < 15)
            this.pos.x = 15;
        if (this.pos.y > utils.canvas.height - 15)
            this.pos.y = utils.canvas.height - 15;
        else if (this.pos.y < 15)
            this.pos.y = 15;

        this.timer += dt;
    };

    Player.prototype.mousePressed = function() {
        if (this.timer > this.cooldown_time && !this.lunging) {
            this.vel.unitEquals();
            this.vel.multiplyEquals(this.lunging_speed);
            this.oldPos = new Vector2D(this.pos.x, this.pos.y); // Save position before lunging so we can draw a streak
            this.timer = 0;
            this.lunging = true;
        }
    };

    // Accessor methods
    Player.prototype.getX = function() {
        return this.pos.x;
    };

    Player.prototype.getY = function() {
        return this.pos.y;
    };

    Player.prototype.isLunging = function() {
        return this.lunging;
    };

    // Return the player object for Require JS
    return Player;

});