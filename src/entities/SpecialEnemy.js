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
    this.pointsLabel = this.game.add.bitmapText(this.x, this.y, 'batmanForever',  '', 12);
    this.pointsLabel.visible = false;
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
            if (that.game !== undefined && that.game !== null) {
                that.revive();
            }
            that.reviving = false;
        }, 5000);
    }
};

SpecialEnemy.prototype.hit = function () {
    'use strict';
    this.shopRewardLabel();
    Enemy.prototype.hit.call(this);
};

SpecialEnemy.prototype.shopRewardLabel = function () {
    'use strict';
    var targetTint = 0x66B25C,
        defaultTint = 0xBBAAEE;
    
    this.pointsLabel.visible = true;
    this.pointsLabel.setText(this.reward + ' points');
    this.pointsLabel.x = this.x;
    this.pointsLabel.y = this.y;

    this.pointsLabel.tint = defaultTint;
    this.game.add.tween(this.pointsLabel).to({ tint: targetTint }, 0, Phaser.Easing.Bounce.In, true)
        .onComplete.add(function (context) {
            setTimeout(function () {
                context.visible = false;
            }, 500);
        }, this);
};