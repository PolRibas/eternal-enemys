'use strict';

function main() {
    var mainElement = document.querySelector('#site-main')

    function buildDom(html) {
        mainElement.innerHTML = html;
        return mainElement;
    }

    function crateSplashScreen() {
        var splashScreen = buildDom(`
        <section>
        <h1>ETERNAL ENEMIS</h1>
        <button>Start</button>
        </section>
        `);
        var startButton = splashScreen.querySelector('button');
        startButton.addEventListener('click', createGameScreen);
    }

    function createGameScreen() {
        var gameScreen = buildDom(`
        <section>
        <canvas width="400" height=400></canvas>
        </section>
        `);
        var canvas = document.querySelector('canvas');
        var game = new Game(canvas);
        game.gameOberCallback(createGameOverScreen);
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 40) {
                console.log('voy abajo');
                game.player.setDirection(1);
            } else if (event.keyCode === 38) {
                console.log('voy arriba');
                game.player.setDirection(-1);
            }
        })
        game.startGame();
    }

    function createGameOverScreen() {
        var gameOverScreen = buildDom(`
        <section>
        <h1>GAME OVER</h1>
        <button>ReStart</button>
        </section>
        `);
        var restartButton = gameOverScreen.querySelector('button');
        restartButton.addEventListener('click', createGameScreen);
    }

    crateSplashScreen();

}
window.addEventListener('load', main);