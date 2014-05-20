define(["utils/utils", "../lib/Vector2D"], function(utils) {

    function Particle(x, y, lifespan) {
        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D(utils.getRandom(-1, 1), utils.getRandom(-1, 1));
        this.lifespan = lifespan;
        this.timer = 0;
        this.isExpired = false;
    }

    Particle.prototype.draw = function(g) {
        if (!this.isExpired) {
            g.fillStyle = "rgba(255,255,255," + (this.lifespan - this.timer) + ")";
            utils.circle(g, this.pos.x, this.pos.y, 5);
        }
    };

    Particle.prototype.update = function(dt) {
        if (!this.isExpired) {
            this.pos.addEquals(this.vel);
            this.timer = Math.min(this.timer + dt, this.lifespan);
        }
        if (!this.isExpired && this.timer >= this.lifespan) {
            this.isExpired = true;
        }
    };

    function CloudParticle(x, y, lifespan) {
        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D(utils.getRandom(-0.5, 0.5), utils.getRandom(-0.5, 0.5));
        this.lifespan = lifespan;
        this.timer = 0;
        this.isExpired = false;
    }

    CloudParticle.prototype.draw = function(g) {
        if (!this.isExpired) {
            g.fillStyle = "rgba(100,100,100," + (0.3 * (this.lifespan - this.timer)).toFixed(2) + ")";
            utils.circle(g, this.pos.x, this.pos.y, 10);
        }
    };

    CloudParticle.prototype.update = function(dt) {
        if (!this.isExpired && this.timer >= this.lifespan) {
            this.isExpired = true;
        }
        if (!this.isExpired) {
            this.pos.addEquals(this.vel);
            this.timer = Math.min(this.timer + dt, this.lifespan);
        }
    };

    // Return an object for Require JS
    return {
        particle: Particle,
        cloudParticle: CloudParticle
    };

});