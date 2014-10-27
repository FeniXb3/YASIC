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
    this.startButton = new TextButton(this.game, Config.MAP_WIDTH / 2, Config.MAP_HEIGHT * 5 / 7, 'Restart game', this.startGame, this);
    this.twitterButton = new TextButton(this.game, Config.MAP_WIDTH / 2, Config.MAP_HEIGHT * 6 / 7 + 40, 'twitter: @fenixb3', this.goToTwitter, this);
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

Invaders.GameOver.prototype.startGame = function () {
    'use strict';
    this.game.state.start('Game');
};

Invaders.GameOver.prototype.goToTwitter = function () {
    'use strict';
    window.open('http://twitter.com/fenixb3', '_blank');
};
