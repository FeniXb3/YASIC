/*global Invaders */
/*global Config */
/*global Phaser */
/*global TextButton */
/*jslint plusplus: true */

Invaders.MainMenu = function (game) { 'use strict'; };
Invaders.MainMenu.prototype = {
    create: function () {
        'use strict';
        this.background = this.add.tileSprite(0, 0, Config.MAP_WIDTH, Config.MAP_HEIGHT, 'bg');
       
        this.displayTitle();
        this.displayInfo();
        this.displayMenu();
        this.displayForkMe();
    },
    startGame: function () {
        'use strict';
        this.game.state.start('Game');
    },
    goToGitHub: function () {
        'use strict';
        window.open('https://github.com/FeniXb3/YASIC', '_blank');
    },
    displayInfo: function () {
        'use strict';
        var i,
            x,
            y,
            bmd,
            infoBackground;
        this.enemyData =  this.game.cache.getJSON('enemyData') || [];
        
        
        
        x = Config.MAP_WIDTH / 3 + 30;
        
        
        bmd = this.add.bitmapData(Config.MAP_WIDTH - (x - 100) * 2, (this.enemyData.length + 1) * 110);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, Config.MAP_WIDTH - (x - 100) * 2, (this.enemyData.length + 1) * 110);
        bmd.ctx.fillStyle = 'black';
        bmd.ctx.fill();
        bmd.render();
        this.maxHealth = 5;
        infoBackground = this.add.sprite(x - 100, 210, bmd);
        infoBackground.alpha = 0.5;
        
        for (i = 0; i < this.enemyData.length; i++) {
            y = i * 110 + 260;
            this.add.sprite(x, y, this.enemyData[i].name).anchor.setTo(0.5, 0.5);
            this.pointsLabel = this.game.add.bitmapText(x + 100, y, 'batmanForever', '= ' + this.enemyData[i].reward + ' points', 25);
            this.pointsLabel.tint = 0xB0A0E0;
        }
        y += 110;
        
        this.add.sprite(x, y, 'observer').anchor.setTo(0.5, 0.5);
        this.pointsLabel = this.game.add.bitmapText(x + 100, y, 'batmanForever', '= ?? points', 25);
        this.pointsLabel.tint = 0xCCBBFF;
        
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
    },
    displayMenu: function () {
        'use strict';
        this.startButton = new TextButton(this.game, Config.MAP_WIDTH / 2, Config.MAP_HEIGHT * 6 / 7 + 20, 'Start game', this.startGame, this);
    },
    displayForkMe: function () {
        'use strict';
        this.forkMeButton = this.add.button(Config.MAP_WIDTH, 0, 'forkme', this.goToGitHub, this, 0, 0, 0);
        this.forkMeButton.anchor.setTo(1, 0);
    }
};