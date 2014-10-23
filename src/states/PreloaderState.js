/*
    Sounds come from freeSFX website - http://www.freesfx.co.uk/
    
    Background by StumpyStruts - http://opengameart.org/content/space-background-2
    Enemy sprites by C-TOY - http://opengameart.org/content/spaceships-drakir
    Hero and barrier sprites by Skorpio - http://opengameart.org/content/spaceships-from-parts-part2artcom
    Explosion sprite by GameProgrammingSlave - http://opengameart.org/content/explosions
    Rocket, laser, gunfire and engine effect sprite by Jonas Wagner - http://opengameart.org/content/asteroid-explosions-rocket-mine-and-laser
    
    
    Font Batman Forever Alternate from - http://www.font-zone.com/download.php?fid=112
        converted to bitmap font with Littera - http://kvazars.com/littera/ 
*/

/*global Invaders */
/*global Config */

Invaders.Preloader = function (game) { 'use strict'; };
Invaders.Preloader.prototype = {
    preload: function () {
        'use strict';
        this.preloadBox = this.add.sprite(Config.MAP_WIDTH / 2, Config.MAP_HEIGHT / 2, 'loadingBox');
        this.preloadBox.anchor.setTo(0.5, 0.5);
        this.preloadBar = this.add.sprite(Config.MAP_WIDTH / 2, Config.MAP_HEIGHT / 2, 'loadingBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        
        this.displayTitle();
        
        // player
        this.load.image('hero', 'assets/graphics/ships/hero.png');
        this.load.image('barrier', 'assets/graphics/ships/barrier.png');
        
        // enemies
        this.load.image('croissant', 'assets/graphics/ships/enemies/croissant.png');
        this.load.image('spider', 'assets/graphics/ships/enemies/spider.png');
        this.load.image('diadem', 'assets/graphics/ships/enemies/diadem.png');
        this.load.image('batarang', 'assets/graphics/ships/enemies/batarang.png');
        this.load.image('observer', 'assets/graphics/ships/enemies/observer.png');
               
        // background
        this.load.image('bg', 'assets/graphics/background.png');
        // gfx
        this.load.image('engine', 'assets/graphics/gfx/engine.png');
        this.load.image('gunfire', 'assets/graphics/gfx/gunfire.png');
        this.load.image('explosion', 'assets/graphics/gfx/explosion.png');
        // projectiles
        this.load.image('laser', 'assets/graphics/projectiles/laser.png');
        this.load.image('rocket', 'assets/graphics/projectiles/rocket.png');
        // hud
        this.load.image('live', 'assets/graphics/hud/lives.png');
        
        
        // JSON data
        this.load.json('enemyData', 'assets/json/enemies.json');
        this.load.json('heroData', 'assets/json/hero.json');
        
        // sounds
        this.load.audio('engine', 'assets/audio/engine.mp3');
        this.load.audio('laser', 'assets/audio/laser.mp3');
        this.load.audio('rocket', 'assets/audio/rocket.mp3');
        this.load.audio('explosion', 'assets/audio/explosion.mp3');
    },
    create: function () {
        'use strict';
        this.game.state.start('MainMenu');
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