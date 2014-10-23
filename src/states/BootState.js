/*
    Loading bar sprite by brightretro - http://opengameart.org/content/various-gui-elements
*/

/*global Config */

var Invaders = {};

Invaders.Boot = function (game) { 'use strict'; };
Invaders.Boot.prototype = {
    preload: function () {
        'use strict';
        
        // loading
        this.load.image('loadingBox', 'assets/graphics/loadingBox.png');
        this.load.image('loadingBar', 'assets/graphics/loadingBar.png');
        // fonts
        this.load.bitmapFont('batmanForever', 'assets/fonts/batmanForever.png', 'assets/fonts/batmanForever.fnt');
    },
    create: function () {
        'use strict';
        
        this.game.state.start('Preloader');
    }
};