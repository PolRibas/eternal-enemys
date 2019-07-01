'use strict';

function Game(canvas) {
    this.player = null;
    this.enemies = [];
    this.isGameOver = false;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')
    this.onGameOver = null;
}

Game.prototype.startGame = function() {
    // inicializar player y enemies
    this.player = new Player(this.canvas);
    console.log("Cargando Loop")
    var loop = () => {
        if (Math.random() > 0.97) {
            var randomY = Math.random() * this.canvas.height - 10;
            var newEnemy = new Enemy(this.canvas, randomY)
            this.enemies.push(newEnemy);
        }
        this.update();
        this.clear(this.canvas);
        this.draw();
        if (!this.isGameOver) {
            requestAnimationFrame(loop);
        } else {
            this.onGameOver();
        }
    }
    loop();
}

Game.prototype.update = function() {
    this.player.move();
    this.enemies.forEach(function(enemy) {
        enemy.move();
    })
    this.checkCollition();
    if (this.player.y <= 0) {
        this.player.direction = 0;
    } else if (this.player.y >= this.canvas.height - this.player.dy) {
        this.player.direction = 0;
    }
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
    this.player.draw();
    this.enemies.forEach(function(enemy) {
        enemy.draw();
    })
}

Game.prototype.checkCollition = function() {
    this.enemies.forEach((enemy, index) => {
        var rightLeft = this.player.x + this.player.dx >= enemy.x;
        var leftRight = this.player.x <= enemy.x + enemy.dx;
        var bottomTop = this.player.y + this.player.dy >= enemy.y;
        var topBottom = this.player.y <= enemy.y + enemy.dy;
        if (rightLeft && leftRight && bottomTop && topBottom) {
            this.enemies.splice(index, 1);
            this.player.lives--;
            console.log('colicion');
            if (this.player.lives === 0) {
                this.isGameOver = true;
            }
        }
    })
}

Game.prototype.gameOberCallback = function(callback) {
    this.onGameOver = callback;
}