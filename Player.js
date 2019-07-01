'use strict';

function Player(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')
    this.x = 20;
    this.y = (this.canvas.height / 2) - 10;
    this.dx = 20;
    this.dy = 20;
    this.lives = 3;
    this.velocity = 3;
    this.direction = 0;
    this.color = 'blue';
}

Player.prototype.move = function() {
    this.y = this.y + this.direction * this.velocity;
}

Player.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}

Player.prototype.setDirection = function(newDirection) {
    this.direction = newDirection;
}