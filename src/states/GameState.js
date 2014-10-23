/*global Invaders */
/*global Config */
/*global Phaser */
/*global Hero */
/*global EnemyGroup */
/*global Barrier */
/*global SpecialEnemy */
/*jslint plusplus: true */

Invaders.Game = function (game) { 'use strict'; };
Invaders.Game.prototype = {
    create: function () {
        'use strict';
        var points = 0;
        
        Object.defineProperty(this, "points", {
            get: function () {
                return points;
            },
            set: function (value) {
                points = value;
                this.updatePointsLabel();
            },
            configurable: true
        });
        
        this.setupHUD();
        this.setupControls();
        this.setupEnemies();
        this.setupWalls();
        this.setupFinish();
        this.updatePointsLabel();
        this.setupShaker();
        
        this.setupHero();
        this.setupBarriers();
    },
    update: function () {
        'use strict';
        this.checkCollisions();
        this.levelCheck();
    },
    levelCheck: function () {
        'use strict';
        var that = this;
        
        if (this.hero.health === 0) {
            this.isTheEnd();
        }
        
        if (this.enemies.countLiving() === 0 && !this.enemies.reviving) {
            this.points += (100 * this.hero.health);
            this.hero.oneUp();
            
            this.enemies.reviving = true;
            setTimeout(function () {
                that.enemies.reviveAll();
            }, this.enemies.revivingTimeout);
        }
    },
    isTheEnd: function () {
        'use strict';
        var that = this;
        if (!this.shaken) {
            this.hero.blocked = true;
            this.shaken = true;
            this.shake.shake(40);

            setTimeout(function () {
                that.game.state.start('GameOver', true, false, that.points);
            }, 3000);
        }
    },
    checkCollisions: function () {
        'use strict';
        this.game.physics.arcade.collide(this.enemies, this.walls, this.collideWalls, null, this);
        this.game.physics.arcade.collide(this.finish, this.enemies, this.reachFinish, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.hero.bullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.hero, this.enemies.rockets, this.hitHero, null, this);
        this.game.physics.arcade.overlap(this.hero, this.enemies, this.hitHero, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.barriers, this.collideBarrier, null, this);
        this.game.physics.arcade.overlap(this.enemies.rockets, this.barriers, this.hitBarrier, null, this);
        this.game.physics.arcade.overlap(this.hero.bullets, this.barriers, this.hitBarrier, null, this);
        this.game.physics.arcade.overlap(this.specialEnemy, this.hero.bullets,  this.hitEnemy, null, this);
    },
    setupControls: function () {
        'use strict';
        this.fireKey = this.game.input.keyboard.addKey(Config.Controls.FIRE);
        this.fireKey.onDown.add(this.handleFireKeyDown, this);
        this.fireKey.onUp.add(this.handleFireKeyUp, this);
        
        this.moveLeftKey = this.game.input.keyboard.addKey(Config.Controls.LEFT);
        this.moveLeftKey.onDown.add(this.handleLeftKeyDown, this);
        this.moveLeftKey.onUp.add(this.handleMoveKeyUp, this);
        
        this.moveRightKey = this.game.input.keyboard.addKey(Config.Controls.RIGHT);
        this.moveRightKey.onDown.add(this.handleRightKeyDown, this);
        this.moveRightKey.onUp.add(this.handleMoveKeyUp, this);
    },
    setupWalls: function () {
        'use strict';
        this.walls = this.game.add.group(undefined, 'walls', false, true, Phaser.Physics.ARCADE);
        this.walls.create(Config.MAP_WIDTH, 0, 'laser');
        this.walls.create(0, 0, 'laser');
        this.walls.setAll('width', 0);
        this.walls.setAll('height', Config.MAP_HEIGHT);
        this.walls.setAll('body.immovable', true);
    },
    setupFinish: function () {
        'use strict';
        this.finish = this.add.sprite(0, Config.MAP_HEIGHT, 'laser');
        this.finish.height = 1;
        this.finish.width = Config.MAP_WIDTH;
        this.finish.game.physics.enable(this.finish, Phaser.Physics.ARCADE);
    },
    setupHUD: function () {
        'use strict';
        this.background = this.add.tileSprite(0, 0, Config.MAP_WIDTH, Config.MAP_HEIGHT, 'bg');
        
        this.pointsLabel = this.game.add.bitmapText(0, 0, 'batmanForever', '0 points', 25);
    },
    setupEnemies: function () {
        'use strict';
        this.enemyData =  this.game.cache.getJSON('enemyData');
        this.enemies = new EnemyGroup(this.game, 8, this.enemyData);
        this.specialEnemy = new SpecialEnemy(this.game, 0, 50, 300);
    },
    setupHero: function () {
        'use strict';
        this.heroData =  this.game.cache.getJSON('heroData');
        this.hero = new Hero(this.game, this.heroData);
    },
    setupBarriers: function (count) {
        'use strict';
        var i,
            x,
            y;
        
        count = count || 4;
        
        this.barriers = this.game.add.group(undefined, 'barriers', false, true, Phaser.Physics.ARCADE);
    
        for (i = 0; i < count; i++) {
            x = i * (Config.MAP_WIDTH / count) + (Config.MAP_WIDTH / count / 2);
            y = this.hero.y - 100;
            this.barriers.add(new Barrier(this.game, x, y));
        }
    },
    setupShaker: function () {
        'use strict';
        this.shake = new Phaser.Plugin.Shake(this.game);
        this.game.plugins.add(this.shake);
        this.shaken = false;
    },
    handleLeftKeyDown: function (key) {
        'use strict';
        this.hero.moveLeft();
    },
    handleRightKeyDown: function (key) {
        'use strict';
        this.hero.moveRight();
    },
    handleMoveKeyUp: function (key) {
        'use strict';

        if (this.moveRightKey.isDown) {
            this.hero.moveRight();
        } else if (this.moveLeftKey.isDown) {
            this.hero.moveLeft();
        } else {
            this.hero.stop();
        }
    },
    handleFireKeyDown: function (key) {
        'use strict';
        this.hero.fire();
    },
    handleFireKeyUp: function (key) {
        'use strict';
        this.hero.stopFire();
    },
    collideWalls: function (enemy, wall) {
        'use strict';
        enemy.parent.setAll('body.velocity', { x: 0, y: 0 });
        this.enemyTween = this.game.add.tween(this.enemies.children[0].body.velocity);
        this.enemyTween.from({ y: 100 }, 0, Phaser.Easing.Linear.None);
        this.enemyTween.onComplete.add(this.enemies.onMoveDownCompleted, this.enemies);
        this.enemyTween.start();
    },
    reachFinish: function (finish, enemy) {
        'use strict';
        this.isTheEnd();
    },
    hitEnemy: function (enemy, bullet) {
        'use strict';
        this.points += enemy.reward;

        enemy.hit();
        bullet.kill();
    },
    hitHero: function (hero, rocket) {
        'use strict';
        hero.hit();
        rocket.destroy();
        this.shake.shake(5);
    },
    hitBarrier: function (item, barrier) {
        'use strict';
        barrier.hit();
        item.kill();
        
        this.shake.shake(3);
    },
    collideBarrier: function (ship, barrier) {
        'use strict';
        barrier.hit();
        ship.hit();
        this.shake.shake(3);
    },
    updatePointsLabel: function () {
        'use strict';
        var targetTint = 0xEEB25C,
            defaultTint = 0xBBAAEE;
        
        this.pointsLabel.setText(this.points + ' points');
        this.pointsLabel.updateTransform();
        this.pointsLabel.x = Config.MAP_WIDTH - this.pointsLabel.width;
        
        if (this.points === 0) {
            this.pointsLabel.tint = defaultTint;
        } else {
            this.pointsLabel.tint = targetTint;
            this.game.add.tween(this.pointsLabel).to({ tint: defaultTint }, 0, Phaser.Easing.Bounce.In, true);
        }
    }
};