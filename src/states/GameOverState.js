/*global Invaders */
/*global Config */
/*global Phaser */
/*global TextButton */
/*global Menu */
/*jslint plusplus: true */

Invaders.GameOver = function (game) { 'use strict'; };
Invaders.GameOver.prototype = Object.create(Invaders.Base.prototype);

Invaders.GameOver.prototype.init = function (points, gameTime, kills) {
    'use strict';
    this.points = points;
    this.gameTime = gameTime / 1000;
    this.kills = kills;
};

Invaders.GameOver.prototype.create = function () {
    'use strict';
    Invaders.Base.prototype.create.call(this);

    this.displayGameOver();
    this.displayKillStats(this.kills);
    this.displayMenu();
};

Invaders.GameOver.prototype.displayMenu = function () {
    'use strict';
    var x = Config.MAP_WIDTH / 2,
        y = Config.MAP_HEIGHT * 6 / 7,
        distance = 30;
    
    this.menu = new Menu(this.game, x, y, distance, this.menus.gameover, this.font, 25);
};

Invaders.GameOver.prototype.displayGameOver = function () {
    'use strict';
    this.gameOverLabel = this.game.add.bitmapText(0, 0, this.font,  'GAME OVER', 52);
    this.pointsLabel = this.game.add.bitmapText(0, 0, this.font,  '0 points', 32);
    this.gameTimeLabel = this.game.add.bitmapText(0, 0, this.font, this.gameTime + ' seconds', 24);
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
    
    this.gameTimeLabel.updateTransform();
    this.gameTimeLabel.x = Config.MAP_WIDTH / 2 - this.gameTimeLabel.width / 2;
    this.gameTimeLabel.y = Config.MAP_HEIGHT / 3 + 40;
    this.gameTimeLabel.tint = defaultTint;
};


Invaders.GameOver.prototype.displayKillStats = function (kills) {
    'use strict';
    var i,
        x,
        y,
        bmd,
        infoBackground,
        enemyName,
        enemySprite,
        distance = 60,
        fontSize = 15;

    x = Config.MAP_WIDTH / 3 + 130;
    bmd = this.add.bitmapData(Config.MAP_WIDTH - (x - 100) * 2, (Object.keys(kills).length) * (distance + 5));
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, Config.MAP_WIDTH - (x - 100) * 2, (Object.keys(kills).length) * (distance + 5));
    bmd.ctx.fillStyle = 'black';
    bmd.ctx.fill();
    bmd.render();
    this.maxHealth = 5;
    infoBackground = this.add.sprite(x - 100, this.gameTimeLabel.y + 30, bmd);
    infoBackground.alpha = 0.5;

    i = 0;
    for (enemyName in kills) {
        if (kills.hasOwnProperty(enemyName)) {
            y = i * distance + this.gameTimeLabel.y + 80;
            enemySprite = this.add.sprite(x, y, enemyName);
            enemySprite.anchor.setTo(0.5, 0.5);
            enemySprite.scale.setTo(0.7, 0.7);
            
            this.pointsLabel = this.game.add.bitmapText(x + 60, enemySprite.y - fontSize / 2, this.font, ' x ' + kills[enemyName], fontSize);
            this.pointsLabel.tint = 0xB0A0E0;

            i++;
        }
    }
};
