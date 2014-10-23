/*global Phaser */
/*global Config */
/*global Spacecraft */

var Enemy = function (game, x, y, image, reward, velocity, engines, guns) {
    'use strict';
    x = x || Config.MAP_WIDTH / 2;
    y = y || Config.MAP_HEIGHT;
    engines = engines || [];
    
    Spacecraft.call(this, game, x, y, image, engines, guns);
    
    this.velocity = velocity;
    this.reward = reward;
};
Enemy.prototype = Object.create(Spacecraft.prototype);
Enemy.prototype.constructor = Enemy;
