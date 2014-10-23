/*global Phaser */
/*global Config */
/*global Spacecraft */
/*jslint plusplus: true */

var Hero = function (game, heroData, x, y) {
    'use strict';
    var health,
        engines,
        guns;
    x = x || Config.MAP_WIDTH / 2;
    y = y || Config.MAP_HEIGHT - 120;
    
    
    engines = heroData.engines;
    guns = heroData.guns;
    
    Spacecraft.call(this, game, x, y, 'hero', engines, guns);
    this.body.collideWorldBounds = true;
    this.fireInterval = 1000;
    this.nextShotTime = this.game.time.now + this.fireInterval;
    

    Object.defineProperty(this, "health", {
        get: function () {
            return health;
        },
        set: function (value) {
            var diff = value - health;
            
            if (diff > 0) {
                while (diff > 0) {
                    this.livesHUD.previous();
                    this.livesHUD.cursor.revive();
                    diff--;
                }
            } else if (diff < 0) {
                while (diff < 0) {
                    this.livesHUD.getFirstAlive().kill();
                    this.livesHUD.next();
                    diff++;
                }
            }

            health = value;
        }
    });
    
    this.setupLifes();
    this.setupEngineSound();
    
};
Hero.prototype = Object.create(Spacecraft.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.update = function () {
    'use strict';
    
    if (this.shooting && this.game.time.now >= this.nextShotTime) {
        this.fire();
        this.nextShotTime = this.game.time.now + this.fireInterval;
    }
};

Hero.prototype.moveLeft = function () {
    'use strict';
    if (this.alive && !this.blocked) {
        if (this.velocity !== -Config.HERO_SPEED) {
            this.velocity = -Config.HERO_SPEED;
        }
        this.engineSound.volume = 1;
    }
};

Hero.prototype.moveRight = function () {
    'use strict';
    if (this.alive && !this.blocked) {
        if (this.velocity !== Config.HERO_SPEED) {
            this.velocity = Config.HERO_SPEED;
        }
        this.engineSound.volume = 1;
    }
};

Hero.prototype.stop = function () {
    'use strict';
    if (this.velocity !== 0) {
        this.velocity = 0;
    }
    this.engineSound.volume = 0.5;
};

Hero.prototype.stopFire = function () {
    'use strict';
    this.shooting = false;
};

Hero.prototype.setupEngineSound = function () {
    'use strict';
    this.engineSound = this.game.add.audio('engine', 0.5, true);
    this.engineSound.play();
};

Hero.prototype.setupLifes = function (maxLives) {
    'use strict';
    var lifeSprite,
        i,
        x,
        y;
    
    this.maxLives = maxLives || 3;
    this.health = this.maxLives;
    this.livesHUD = this.game.add.group();
    for (i = this.maxLives - 1; i >= 0; i--) {
        x = i * 50;
        y = 0;
        this.livesHUD.create(x, y, 'live');
    }
};

Hero.prototype.hit = function () {
    'use strict';
    var that = this;
    
    if (!this.blocked) {
        Spacecraft.prototype.hit.call(this);

        this.blocked = true;
        this.x = this.start.x;
        this.y = this.start.y;
        this.stop();
        this.stopFire();

        this.game.add.tween(this)
            .from({ alpha: 0.4 }, 0, Phaser.Easing.Bounce.In, true)
            .onComplete.add(function () {
                that.blocked = false;
            });
    }
};

Hero.prototype.oneUp = function () {
    'use strict';
    if (this.health < this.maxLives) {
        this.health++;
    }
};
