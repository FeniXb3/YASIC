/*global Phaser */
/*global Config */
/*global Spacecraft */

var Barrier = function (game, x, y) {
    'use strict';
    var health;
    
    x = x || Config.MAP_WIDTH / 2;
    y = y || Config.MAP_HEIGHT;
    
    Spacecraft.call(this, game, x, y, 'barrier');
    
    Object.defineProperty(this, "health", {
        get: function () {
            return health;
        },
        set: function (value) {
            health = value;
            this.tint = 0xFF0000 + (0x00FFFF * health / this.maxHealth);
        }
    });
    
    this.maxHealth = 15;
    this.health = this.maxHealth;
};
Barrier.prototype = Object.create(Spacecraft.prototype);
Barrier.prototype.constructor = Barrier;

Barrier.prototype.hit = function () {
    'use strict';
    var that = this;
    
    if (!this.blocked) {
        Spacecraft.prototype.hit.call(this);
        
        this.alpha = 1;
        this.game.add.tween(this)
            .from({ alpha: 0.4 }, 0, Phaser.Easing.Bounce.In, true)
            .onComplete.add(function () {
                that.blocked = false;
            });
    }
};