/*global Phaser */
/*global Config */
/*global Enemy */

var SpecialEnemy = function (game, x, y, velocity) {
    'use strict';
    x = x || 0;
    y = y || 0;
    velocity = velocity || Config.SPECIAL_SPEED;
    
    Enemy.call(this, game, x, y, 'observer', 0, velocity);
    
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;
    this.reviving = false;
    this.kill();
    
    this.possibleStartPoints = [{ x: 0, y: 100, velocity: velocity }, { x: Config.MAP_WIDTH, y: 100, velocity: -velocity }];
};
SpecialEnemy.prototype = Object.create(Enemy.prototype);
SpecialEnemy.prototype.constructor = SpecialEnemy;

SpecialEnemy.prototype.update = function () {
    'use strict';
    var that = this,
        index;
    
    if (!this.alive && !this.reviving) {
        this.reviving = true;
        index = Math.floor(Math.random() * 2);
        
        this.x = this.possibleStartPoints[index].x;
        this.y = this.possibleStartPoints[index].y;
        this.body.velocity.x = this.possibleStartPoints[index].velocity;
        this.reward = Math.floor(Math.random() * 10 + 1) * 100;
        
        this.reviveTimeout = setTimeout(function () {
            that.revive();
            that.reviving = false;
        }, 5000);
    }
};