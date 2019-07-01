'use strict';

function Enemy(canvas, randomY) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width;
    this.y = randomY;
    this.velocity = Math.random() * 4 + 2;
    this.direction = -1;
    this.color = 'red';
    this.dx = Math.random() * 10 + 7;
    this.dy = this.dx;
}

Enemy.prototype.move = function() {
    this.x = this.x + this.direction * this.velocity;
}

Enemy.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}