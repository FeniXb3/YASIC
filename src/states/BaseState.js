/*global Invaders */
/*global Config */
/*global Phaser */
/*global TextButton */
/*jslint plusplus: true */

Invaders.Base = function (game) { 'use strict'; };
Invaders.Base.prototype = {
    create: function (options) {
        'use strict';
        options = options || {};
        this.background = this.add.tileSprite(0, 0, Config.MAP_WIDTH, Config.MAP_HEIGHT, 'bg');
        this.font = 'batmanForever';
        
        if (options.displayTitle !== false) {
            this.displayTitle();
        }
        if (options.displayForkMe !== false) {
            this.displayForkMe();
        }
        if (options.loadMenusData !== false) {
            this.loadMenusData();
        }
    },
    goToGitHub: function () {
        'use strict';
        window.open('https://github.com/FeniXb3/YASIC', '_blank');
    },
    displayTitle: function () {
        'use strict';
        this.title = this.game.add.bitmapText(0, 0, this.font,  'YASIC', 62);
        this.title.x = Config.MAP_WIDTH / 2 - this.title.width / 2;
        this.title.y = Config.MAP_HEIGHT / 12;
        this.title.tint = 0xBBAAEE;
        
        this.titleLong = this.game.add.bitmapText(0, 0, this.font,  'Yet Another Space Invaders Clone', 24);
        this.titleLong.x = Config.MAP_WIDTH / 2 - this.titleLong.width / 2;
        this.titleLong.y = Config.MAP_HEIGHT / 6;
        this.titleLong.tint = 0xBBAAEE;
    },
    displayForkMe: function () {
        'use strict';
        this.forkMeButton = this.add.button(Config.MAP_WIDTH, 0, 'forkme', this.goToGitHub, this, 0, 0, 0);
        this.forkMeButton.anchor.setTo(1, 0);
    },
    loadMenusData: function () {
        'use strict';
        this.menus = this.game.cache.getJSON('menusData');
    }
};