define(["utils/utils"], function(utils) {

    // Constructor
    function Enemy() {
        // Instance varaibles
        this.pos = new Vector2D(Math.random() * utils.canvas.width, Math.random() * utils.canvas.height);
        this.oldPos = new Vector2D(0, 0);
        this.vel = new Vector2D(0, 0);
        this.speed = (Math.random() * 1) + 1;
        this.lunging = false;
        this.waiting = false;
        this.spawned = false;
        this.lunging_speed = 20;
        this.lunging_time = 0.4;
        this.lunging_delay = Math.random() + 1;
        this.timer = 0;
    }

    Enemy.prototype.draw = function(g) {
        if (this.lunging) { // Draw a streak while lunging
            g.strokeStyle = "rgba(255,255,255," + (this.lunging_time - this.timer) + ")";
            g.lineWidth = 6;
            g.beginPath();
            g.moveTo(this.pos.x, this.pos.y);
            g.lineTo(this.oldPos.x, this.oldPos.y);
            g.closePath();
            g.stroke();
        }
        if (this.waiting)
            g.fillStyle = "rgb(242,238,10)";
        else
            g.fillStyle = "rgb(204,8,8)";
        utils.circle(g, this.pos.x, this.pos.y, 15);
        if (this.waiting)
            g.fillStyle = "rgb(214,211,9)";
        else
            g.fillStyle = "rgb(163,41,41)";
        utils.circle(g, this.pos.x, this.pos.y, 10);

    };

    Enemy.prototype.update = function(dt, Player) {
        if (utils.dist(this.pos.x, this.pos.y, Player.getX(), Player.getY()) < 100 && !this.waiting && !this.lunging) {
            this.waiting = true;
            this.timer = 0;
            this.oldPos = new Vector2D(this.pos.x, this.pos.y);
        }
        if (!this.lunging) {
            this.vel = new Vector2D(Player.getX(), Player.getY());
            this.vel.subtractEquals(this.pos);
            this.vel.unitEquals();
            this.vel.multiplyEquals(this.speed);
        } else {
            this.vel.multiplyEquals(0.9); // Ease velocity vector while lunging
            if (this.timer > this.lunging_time) {
                this.lunging = false;
                this.waiting = false;
                this.timer = 0;
            }
        }
        if (!this.waiting || this.lunging) {
            this.pos.addEquals(this.vel); // Move if we're not waiting
        } else {
            if (this.timer > this.lunging_delay) {
                this.vel.unitEquals();
                this.vel.multiplyEquals(this.lunging_speed);
                this.lunging = true;
                this.timer = 0;
            }
        }
        this.timer += dt;
    };

    Enemy.prototype.getX = function() {
        return this.pos.x;
    };

    Enemy.prototype.getY = function() {
        return this.pos.y;
    };

    Enemy.prototype.isLunging = function() {
        return this.lunging;
    };

    // Return the enemy object for Require JS
    return Enemy;

});