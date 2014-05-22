define(["utils/utils", "player", "enemy", "particleEmitter", "particle", "highScore"], function(utils, player, enemy, particleEmitter, particle, scores) {

    var enemies = [];
    var emitters = [];
    var Player = new player();
    var timer = 0;
    var time_display = 0;
    var score = 0;
    var highScore = 0;
    var bestTime = 0;
    var playing = true;

    function load(g) {
        enemies.push(new enemy());
        emitters.push(new particleEmitter(enemies[0].pos.x, enemies[0].pos.y, 20, particle.cloudParticle, 2));
        g.font = "40px BebasNeue Light";
        highScore = scores.getScore();
        bestTime = scores.getTime();
    }

    function draw(g) {
        g.clearRect(0, 0, utils.canvas.width, utils.canvas.height);
        g.fillStyle = "rgb(200,200,200)";
        g.fillRect(0, 0, utils.canvas.width, utils.canvas.height);
        g.strokeStyle = "rgb(150,150,150)";
        g.lineWidth = 1;
        for (var w = 0; w < utils.canvas.width; w += 50) {
            utils.line(g, w, 0, w, utils.canvas.height);
        }
        for (var l = 0; l < utils.canvas.height; l += 50) {
            utils.line(g, 0, l, utils.canvas.width, l);
        }
        Player.draw(g);
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].draw(g);
        }
        for (var j = 0; j < emitters.length; j++) {
            emitters[j].draw(g);
        }
        g.font = "40px BebasNeue Light";
        g.textAlign = "left";
        g.fillStyle = "rgb(0,0,0)";
        g.fillText("Score: " + score, 10, 75);
        g.fillText("Time: " + time_display.toFixed(2) + "s", 10, 40);
        g.textAlign = "right";
        g.fillText("High Score: " + highScore, utils.canvas.width - 10, 75);
        g.fillText("Best Time: " + bestTime + "s", utils.canvas.width - 10, 40);
        if (!playing) {
            g.fillStyle = "rgba(0,0,0,0.5)";
            g.fillRect(0, 0, utils.canvas.width, utils.canvas.height);
            g.fillStyle = "rgb(255,0,0)";
            g.textAlign = "center";
            g.font = "100px BebasNeue Bold";
            g.fillText("You Died!", utils.canvas.width / 2, utils.canvas.height / 2);
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
                        if (score > highScore) scores.saveScore(score);
                        if (time_display > bestTime) scores.saveTime(time_display.toFixed(2));
                    }
                }

            }
            for (var j = 0; j < emitters.length; j++) {
                emitters[j].update(dt);
                if (emitters[j].particles.length === 0) { //Change this out with expired
                    emitters.splice(j, 1); // Remove enemy at index i
                }
            }
            if (timer > 5 / (Math.floor(time_display / 10) + 1)) {
                enemies.push(new enemy());
                emitters.push(new particleEmitter(enemies[i].pos.x, enemies[i].pos.y, 20, particle.cloudParticle, 2));
                timer = 0;
            }
            timer += dt;
            time_display += dt;

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