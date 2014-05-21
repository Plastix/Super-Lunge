define(["utils/utils", "player", "enemy", "particleEmitter", "particle"], function(utils, player, enemy, particleEmitter, particle) {

    var enemies = [];
    var emitters = [];
    var Player = new player();
    var timer2 = 0;
    var total_time = 0;
    var score = 0;
    var playing = true;

    function load(g) {
        // enemies.push(new enemy());
        g.font = "20px Lucida Sans Unicode";
    }

    function draw(g) {
        g.clearRect(0, 0, utils.canvas.width, utils.canvas.height);
        g.fillStyle = "rgb(200,200,200)";
        g.fillRect(0, 0, utils.canvas.width, utils.canvas.height);
        Player.draw(g);
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].draw(g);
        }
        for (var j = 0; j < emitters.length; j++) {
            emitters[j].draw(g);
        }

        g.fillStyle = "rgb(0,0,0)";
        g.fillText("Score: " + score, 20, 50);
        g.fillText("Time: " + total_time.toFixed(2) + "s", 20, 30);
        if (!playing) {
            g.fillStyle = "rgba(0,0,0,0.5)";
            g.fillRect(0, 0, utils.canvas.width, utils.canvas.height);
            g.fillStyle = "rgb(255,0,0)";
            g.fillText("You DEAD!", 400, 400);

        }

    }

    function update(dt) {
        if (playing) {
            Player.update(dt);
            for (var i = 0; i < enemies.length; i++) {
                enemies[i].update(dt, Player);
                if (utils.dist(Player.pos.x, Player.pos.y, enemies[i].pos.x, enemies[i].pos.y) < 15) {
                    if (Player.lunging && enemies[i].currentState != enemies[i].state.LUNGING) {
                        emitters.push(new particleEmitter(enemies[i].pos.x, enemies[i].pos.y, 10, particle.particle, 1));
                        enemies[i] = null;
                        enemies.splice(i, 1); // Remove enemy at index i
                        i--;
                        score += 1;
                    } else if (enemies[i].currentState == enemies[i].state.LUNGING && !Player.lunging) {
                        playing = false;
                    }
                }

            }
            for (var j = 0; j < emitters.length; j++) {
                emitters[j].update(dt);
                if (emitters[j].particles.length === 0) { //Change this out with expired
                    emitters.splice(j, 1); // Remove enemy at index i
                }
            }
            if (timer2 > 2) {
                enemies.push(new enemy());
                emitters.push(new particleEmitter(enemies[i].pos.x, enemies[i].pos.y, 20, particle.cloudParticle, 2));
                timer2 = 0;
            }
            timer2 += dt;
            total_time += dt;

        }
    }

    function mousePressed() {
        Player.mousePressed();
    }

    // Return an object for Require JS
    return {
        load: load,
        draw: draw,
        update: update,
        mousePressed: mousePressed,
    };
});