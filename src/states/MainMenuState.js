/*global Invaders */
/*global Config */
/*global Phaser */
/*global TextButton */
/*jslint plusplus: true */
/*global Menu */

Invaders.MainMenu = function (game) { 'use strict'; };
Invaders.MainMenu.prototype = Object.create(Invaders.Base.prototype);

Invaders.MainMenu.prototype.create = function () {
    'use strict';
    Invaders.Base.prototype.create.call(this);

    this.displayInfo();
    this.displayMenu();
};

Invaders.MainMenu.prototype.displayInfo = function () {
    'use strict';
    var i,
        x,
        y,
        bmd,
        infoBackground;
    this.enemyData =  this.game.cache.getJSON('enemyData') || [];

    x = Config.MAP_WIDTH / 3 + 30;
    bmd = this.add.bitmapData(Config.MAP_WIDTH - (x - 100) * 2, (this.enemyData.length + 1) * 85);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, Config.MAP_WIDTH - (x - 100) * 2, (this.enemyData.length + 1) * 85);
    bmd.ctx.fillStyle = 'black';
    bmd.ctx.fill();
    bmd.render();
    this.maxHealth = 5;
    infoBackground = this.add.sprite(x - 100, 210, bmd);
    infoBackground.alpha = 0.5;

    for (i = 0; i < this.enemyData.length; i++) {
        y = i * 80 + 260;
        this.add.sprite(x, y, this.enemyData[i].name).anchor.setTo(0.5, 0.5);
        this.pointsLabel = this.game.add.bitmapText(x + 100, y, this.font, '= ' + this.enemyData[i].reward + ' points', 25);
        this.pointsLabel.tint = 0xB0A0E0;
    }
    y += 80;

    this.add.sprite(x, y, 'observer').anchor.setTo(0.5, 0.5);
    this.pointsLabel = this.game.add.bitmapText(x + 100, y, this.font, '= ?? points', 25);
    this.pointsLabel.tint = 0xCCBBFF;
};

Invaders.MainMenu.prototype.displayMenu = function () {
    'use strict';
    var x = Config.MAP_WIDTH / 2,
        y = Config.MAP_HEIGHT * 6 / 7 + 20,
        distance = 30;
    
    this.menu = new Menu(this.game, x, y, distance, this.menus.main, this.font, 25);
};
