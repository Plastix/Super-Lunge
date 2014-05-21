define(["utils/utils"], function(utils) {

    // Constructor
    function Enemy() {
        // Instance varaibles
        this.pos = new Vector2D(Math.random() * utils.canvas.width, Math.random() * utils.canvas.height);
        this.oldPos = new Vector2D(0, 0);
        this.vel = new Vector2D(0, 0);
        this.speed = (Math.random() * 1) + 1;
        this.currentState = 0;
        this.state = {
            SPAWNING: 0,
            TRACKING: 1,
            WAITING: 2,
            LUNGING: 3,
        };
        this.LUNGING_SPEED = 20;
        this.LUNGING_TIME = 0.4;
        this.LUNGING_DELAY = Math.random() + 1;
        this.timer = 0;
    }

    Enemy.prototype.draw = function(g) {
        if (this.currentState == this.state.LUNGING) { // Draw a streak while lunging
            g.strokeStyle = "rgba(255,255,255," + (this.LUNGING_TIME - this.timer) + ")";
            g.lineWidth = 6;
            g.beginPath();
            g.moveTo(this.pos.x, this.pos.y);
            g.lineTo(this.oldPos.x, this.oldPos.y);
            g.closePath();
            g.stroke();
        }
        if (this.currentState == this.state.WAITING)
            g.fillStyle = "rgb(242,238,10)";
        else
            g.fillStyle = "rgb(204,8,8)";
        utils.circle(g, this.pos.x, this.pos.y, 15);
        if (this.currentState == this.state.WAITING)
            g.fillStyle = "rgb(214,211,9)";
        else
            g.fillStyle = "rgb(163,41,41)";
        utils.circle(g, this.pos.x, this.pos.y, 10);

    };

    Enemy.prototype.update = function(dt, Player) {
        if (this.currentState == this.state.SPAWNING && this.timer > 1) {
            this.currentState = this.state.TRACKING;
        }
        if (utils.dist(this.pos.x, this.pos.y, Player.pos.x, Player.pos.y) < 100 && this.currentState == this.state.TRACKING) {
            this.currentState = this.state.WAITING;
            this.timer = 0;
            this.oldPos = new Vector2D(this.pos.x, this.pos.y);
        }
        if (this.currentState != this.state.LUNGING) {
            this.vel = new Vector2D(Player.pos.x, Player.pos.y);
            this.vel.subtractEquals(this.pos);
            this.vel.unitEquals();
            this.vel.multiplyEquals(this.speed);
        } else {
            this.vel.multiplyEquals(0.9); // Ease velocity vector while lunging
            if (this.timer > this.LUNGING_TIME) {
                this.currentState = this.state.TRACKING;
                this.timer = 0;
            }
        }
        if (this.currentState == this.state.TRACKING || this.currentState == this.state.LUNGING) {
            this.pos.addEquals(this.vel); // Move if we're not waiting
        } else {
            if (this.timer > this.LUNGING_DELAY) {
                this.vel.unitEquals();
                this.vel.multiplyEquals(this.LUNGING_SPEED);
                this.currentState = this.state.LUNGING;
                this.timer = 0;
            }
        }
        this.timer += dt;
    };

    // Return the enemy object for Require JS
    return Enemy;

});