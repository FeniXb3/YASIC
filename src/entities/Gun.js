/*global Phaser */
/*global Config */
/*global Sound */
/*jslint plusplus: true */

var Gun = function (game, gunInfo) {
    'use strict';
    gunInfo.x = gunInfo.x || 0;
    gunInfo.y = gunInfo.y || 0;
    
    Phaser.Sprite.call(this, game, gunInfo.x, gunInfo.y, 'gunfire');
    this.game.add.existing(this);

    this.anchor.setTo(0.5, 1);
    this.visible = false;
    this.angle = gunInfo.angle;
    if (gunInfo.flip) {
        this.scale.x *= -1;
    }
    this.ammo = {
        type: gunInfo.ammo.type,
        velocity: gunInfo.ammo.velocity
    };
    
    this.sound = new Sound(this.game, this.ammo.type, 'SFX', 0.1);
};
Gun.prototype = Object.create(Phaser.Sprite.prototype);
Gun.prototype.constructor = Gun;
