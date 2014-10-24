/*global Invaders */
/*global Config */
/*global Phaser */
/*global TextButton */

Invaders.GameOver = function (game) { 'use strict'; };
Invaders.GameOver.prototype = {
    create: function () {
        'use strict';
        this.background = this.add.tileSprite(0, 0, Config.MAP_WIDTH, Config.MAP_HEIGHT, 'bg');

        this.gameOverLabel = this.game.add.bitmapText(0, 0, 'batmanForever',  'GAME OVER', 52);
        this.pointsLabel = this.game.add.bitmapText(0, 0, 'batmanForever',  '0 points', 32);
        this.updateLabels();
        
        this.displayTitle();
        
        this.startButton = new TextButton(this.game, Config.MAP_WIDTH / 2, Config.MAP_HEIGHT * 5 / 7, 'Restart game', this.startGame, this);
        this.twitterButton = new TextButton(this.game, Config.MAP_WIDTH / 2, Config.MAP_HEIGHT * 6 / 7 + 40, 'twitter: @fenixb3', this.goToTwitter, this);
        
        this.forkMeButton = this.add.button(Config.MAP_WIDTH, 0, 'forkme', this.goToGitHub, this, 0, 0, 0);
        this.forkMeButton.anchor.setTo(1, 0);
    },
    init: function (points) {
        'use strict';
        this.points = points;
    },
    updateLabels: function () {
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
    },
    startGame: function () {
        'use strict';
        this.game.state.start('Game');
    },
    goToTwitter: function () {
        'use strict';
        window.open('http://twitter.com/fenixb3', '_blank');
    },
    goToGitHub: function () {
        'use strict';
        window.open('https://github.com/FeniXb3/YASIC', '_blank');
    },
    displayTitle: function () {
        'use strict';
        this.title = this.game.add.bitmapText(0, 0, 'batmanForever',  'YASIC', 62);
        this.title.x = Config.MAP_WIDTH / 2 - this.title.width / 2;
        this.title.y = Config.MAP_HEIGHT / 12;
        this.title.tint = 0xBBAAEE;
        
        this.titleLong = this.game.add.bitmapText(0, 0, 'batmanForever',  'Yet Another Space Invaders Clone', 24);
        this.titleLong.x = Config.MAP_WIDTH / 2 - this.titleLong.width / 2;
        this.titleLong.y = Config.MAP_HEIGHT / 6;
        this.titleLong.tint = 0xBBAAEE;
    }
};