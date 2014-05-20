define(["utils/utils", "particle", "../lib/Vector2D"], function(utils, particle) {

    // Constructor
    function Emitter(x, y, num, particle, lifespan) {
        // Instance variables
        this.pos = new Vector2D(x, y);
        this.particles = [];
        for (var i = 0; i < num; i++) {
            this.particles.push(new particle(x, y, lifespan));
        }
    }

    Emitter.prototype.draw = function(g) {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(g);
        }
    };


    Emitter.prototype.update = function(dt) {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update(dt);
            if (this.particles[i].isExpired) {
                this.particles[i] = null;
                this.particles.splice(i, 1); // Remove particle at index i
                i--;
            }
        }
        this.timer += dt;
    };

    // Return the emitter object for Require JS
    return Emitter;

});