/*global Phaser */
/*global Enemy */
/*global Config */
/*jslint plusplus: true */

var EnemyGroup = function (game, maxInRow, enemyData) {
    'use strict';
    var column,
        row,
        maxRows,
        x,
        y;
    maxInRow = maxInRow || 8;
    
    enemyData = enemyData || [];
    maxRows = enemyData.length;
    
    Phaser.Group.call(this, game, undefined, 'enemies', false, true, Phaser.Physics.ARCADE);
    
    this.velocity = Config.ENEMY_SPEED;
    this.projectiles = this.game.add.group(undefined, 'projectiles', false, true, Phaser.Physics.ARCADE);
    this.fireInterval = 1000;
    this.nextRocketTime = this.game.time.now + this.fireInterval;
    this.reviving = false;
    this.revivingTimeout = 1000;
    
    for (row = 0; row < maxRows; row++) {
        for (column = 0; column < maxInRow; column++) {
            x = column * 110 + 80;
            y = (maxRows - 1 - row) * 100 + 120;
            
            this.add(new Enemy(this.game, x, y, enemyData[row].name, enemyData[row].reward, this.velocity, enemyData[row].engines, enemyData[row].guns));
        }
    }
};
EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.constructor = EnemyGroup;

EnemyGroup.prototype.update = function () {
    'use strict';
    var that = this;
  
    if (this.countLiving() > 0) {
        this.fireRocket();
    }
};

EnemyGroup.prototype.reviveAll = function () {
    'use strict';
    var that = this;
    
    this.velocity = Config.ENEMY_SPEED;
    this.forEachDead(function (enemy) {
        enemy.position.setTo(enemy.start.x, enemy.start.y);
        enemy.body.velocity = { x: that.velocity, y: 0 };
        enemy.revive();
    });
    this.reviving = false;
};

EnemyGroup.prototype.onMoveDownCompleted = function (event) {
    'use strict';
    this.velocity *= -1;
    if (this.velocity > 0) {
        this.velocity += 20;
    } else {
        this.velocity -= 20;
    }
    
    this.setAll('velocity', this.velocity);
};


EnemyGroup.prototype.fireRocket = function () {
    'use strict';
    var index;
    
    if (this.game.time.now >= this.nextRocketTime) {
        index = Math.floor(Math.random() * this.length);
        while (!this.children[index].alive) {
            index = Math.floor(Math.random() * this.length);
        }
        this.children[index].fire(this.projectiles);

        this.nextRocketTime = this.game.time.now + this.fireInterval;
    }
   
};