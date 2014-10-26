/*global Invaders */
/*global Config */
/*global Phaser */
/*global TextButton */
/*global TextSwitch */
/*jslint plusplus: true */

Invaders.Settings = function (game) { 'use strict'; };
Invaders.Settings.prototype = {
    create: function () {
        'use strict';
        this.background = this.add.tileSprite(0, 0, Config.MAP_WIDTH, Config.MAP_HEIGHT, 'bg');
       
        this.displayOptions();
    },
    goBackToMainMenu: function () {
        'use strict';
        this.game.state.start('MainMenu');
    },
    displayOptions: function () {
        'use strict';
        var x = Config.MAP_WIDTH / 2,
            y = Config.MAP_HEIGHT * 6 / 7 + 20,
            distance = 30;
        this.sfxOption = new TextSwitch(this.game, x, y, 'Sound effects', 'muteSFX', true);
        y += distance;
        this.backButton = new TextButton(this.game, x, y, 'Back', this.goBackToMainMenu, this);
    }
};