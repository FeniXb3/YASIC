/*global Invaders */
/*global Config */
/*global Phaser */
/*global TextButton */

Invaders.GameOver = function (game) { 'use strict'; };
Invaders.GameOver.prototype = Object.create(Invaders.Base.prototype);

Invaders.GameOver.prototype.init = function (points) {
    'use strict';
    this.points = points;
};

Invaders.GameOver.prototype.create = function () {
    'use strict';
    Invaders.Base.prototype.create.call(this);

    this.displayGameOver();
    this.displayMenu();
};

Invaders.GameOver.prototype.displayMenu = function () {
    'use strict';
    var x = Config.MAP_WIDTH / 2,
        y = Config.MAP_HEIGHT * 5 / 7,
        distance = 30;
    
    this.menu = new Menu(this.game, x, y, distance, this.menus.gameover);
};

Invaders.GameOver.prototype.displayGameOver = function () {
    'use strict';
    this.gameOverLabel = this.game.add.bitmapText(0, 0, 'batmanForever',  'GAME OVER', 52);
    this.pointsLabel = this.game.add.bitmapText(0, 0, 'batmanForever',  '0 points', 32);
    this.updateLabels();
};


Invaders.GameOver.prototype.updateLabels = function () {
    'use strict';
    var targetTint = 0x66B25C,
        defaultTint = 0xBBAAEE;

    this.gameOverLabel.updateTransform();
    this.gameOverLabel.x = Config.MAP_WIDTH / 2 - this.gameOverLabel.width / 2;
    this.gameOverLabel.y = Config.MAP_HEIGHT / 4;
    this.gameOverLabel.tint = defaultTint;

    this.pointsLabel.setText(this.points + ' points');
    this.pointsLabel.updateTransform();
    this.pointsLabel.x = Config.MAP_WIDTH / 2 - this.pointsLabel.width / 2;
    this.pointsLabel.y = Config.MAP_HEIGHT / 3;

    if (this.points === 0) {
        this.pointsLabel.tint = defaultTint;
    } else {
        this.pointsLabel.tint = defaultTint;
        this.game.add.tween(this.pointsLabel).to({ tint: targetTint }, 0, Phaser.Easing.Bounce.In, true);
    }
};
