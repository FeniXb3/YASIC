/*global Phaser */
/*global Config */

var Projectile = function (game, x, y, image, angle, velocity) {
    'use strict';
    x = x || 0;
    y = y || 0;
    
    Phaser.Sprite.call(this, game, x, y, image);
    this.game.add.existing(this);

    this.anchor.setTo(0.5, 1);
    this.angle = angle;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;
    this.body.velocity.y = velocity.y;
    this.body.velocity.x = velocity.x;
};
Projectile.prototype = Object.create(Phaser.Sprite.prototype);
Projectile.prototype.constructor = Projectile;

Projectile.prototype.hit = function () {
    'use strict';
    // those lines will cause kill on this projectile after checking if it's in the world bounds because of outOfBoundsKill set to true
    // that's a workaround - killing projectile just after collision was causing it to still collide after revive
    this.x = -10;
    this.y = -10;
};