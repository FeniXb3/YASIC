/*global Invaders */
/*global Config */
/*global Phaser */
/*global TextButton */
/*jslint plusplus: true */
/*global Menu */

Invaders.Credits = function (game) { 'use strict'; };
Invaders.Credits.prototype = Object.create(Invaders.Base.prototype);

Invaders.Credits.prototype.create = function () {
    'use strict';
    Invaders.Base.prototype.create.call(this);

    this.displayMenu();
    this.displayCreditsTitle();
};

Invaders.Credits.prototype.displayMenu = function () {
    'use strict';
    var x = Config.MAP_WIDTH / 2,
        y = Config.MAP_HEIGHT * 3 / 7 + 20,
        distance = 30;
    
    this.menu = new Menu(this.game, x, y, distance, this.menus.credits, this.font, 20, { data: "MainMenu"});
};

Invaders.Credits.prototype.displayCreditsTitle = function () {
    'use strict';
    this.creditsTitle = this.game.add.bitmapText(0, 0, this.font,  'Credits', 32);
    
    this.creditsTitle.updateTransform();
    this.creditsTitle.x = Config.MAP_WIDTH / 2 - this.creditsTitle.width / 2;
    this.creditsTitle.y = Config.MAP_HEIGHT / 3;
    this.creditsTitle.tint = 0xBBAAEE;
    
    
};
