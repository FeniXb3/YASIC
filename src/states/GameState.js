/*global Invaders */
/*global Config */
/*global Phaser */
/*global Hero */
/*global EnemyGroup */
/*global Barrier */
/*global SpecialEnemy */
/*jslint plusplus: true */

Invaders.Game = function (game) { 'use strict'; };
Invaders.Game.prototype = Object.create(Invaders.Base.prototype);

Invaders.Game.prototype.create = function () {
    'use strict';
    var points = 0;
    
    Invaders.Base.prototype.create.call(this, { displayTitle: false, displayForkMe: false });

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
};

Invaders.Game.prototype.update = function () {
    'use strict';
    this.checkCollisions();
    this.levelCheck();
};

Invaders.Game.prototype.levelCheck = function () {
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
};

Invaders.Game.prototype.isTheEnd = function () {
    'use strict';
    var that = this;
    if (!this.shaken) {
        this.hero.blocked = true;
        clearTimeout(this.specialEnemy.reviveTimeout);
        this.shaken = true;
        this.shake.shake(40);

        setTimeout(function () {
            that.game.state.start('GameOver', true, false, that.points);
        }, 3000);
    }
};

Invaders.Game.prototype.checkCollisions = function () {
    'use strict';
    // walls and finish
    this.game.physics.arcade.collide(this.enemies, this.walls, this.collideWalls, null, this);
    this.game.physics.arcade.collide(this.finish, this.enemies, this.reachFinish, null, this);

    // hero's projectiles
    this.game.physics.arcade.overlap(this.enemies, this.hero.projectiles, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.barriers, this.hero.projectiles, this.hitBarrier, null, this);
    this.game.physics.arcade.overlap(this.hero.projectiles, this.specialEnemy, this.hitEnemy, null, this);

    // enemies' projectiles
    this.game.physics.arcade.overlap(this.hero, this.enemies.projectiles, this.hitHero, null, this);
    this.game.physics.arcade.overlap(this.barriers, this.enemies.projectiles, this.hitBarrier, null, this);

    // enemies
    this.game.physics.arcade.overlap(this.enemies, this.hero, this.hitHero, null, this);
    this.game.physics.arcade.overlap(this.enemies, this.barriers, this.hitBarrier, null, this);
};

Invaders.Game.prototype.setupControls = function () {
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
};

Invaders.Game.prototype.setupWalls = function () {
    'use strict';
    this.walls = this.game.add.group(undefined, 'walls', false, true, Phaser.Physics.ARCADE);
    this.walls.create(Config.MAP_WIDTH, 0, 'laser');
    this.walls.create(0, 0, 'laser');
    this.walls.setAll('width', 0);
    this.walls.setAll('height', Config.MAP_HEIGHT);
    this.walls.setAll('body.immovable', true);
};

Invaders.Game.prototype.setupFinish = function () {
    'use strict';
    this.finish = this.add.sprite(0, Config.MAP_HEIGHT, 'laser');
    this.finish.height = 1;
    this.finish.width = Config.MAP_WIDTH;
    this.finish.game.physics.enable(this.finish, Phaser.Physics.ARCADE);
};

Invaders.Game.prototype.setupHUD = function () {
    'use strict';

    this.pointsLabel = this.game.add.bitmapText(0, 0, 'batmanForever', '0 points', 25);
};

Invaders.Game.prototype.setupEnemies = function () {
    'use strict';
    this.enemyData =  this.game.cache.getJSON('enemyData');
    this.enemies = new EnemyGroup(this.game, 8, this.enemyData);
    this.specialEnemy = new SpecialEnemy(this.game, 0, 50, 300);
};

Invaders.Game.prototype.setupHero = function () {
    'use strict';
    this.heroData =  this.game.cache.getJSON('heroData');
    this.hero = new Hero(this.game, this.heroData);
};

Invaders.Game.prototype.setupBarriers = function (count) {
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
};

Invaders.Game.prototype.setupShaker = function () {
    'use strict';
    this.shake = new Phaser.Plugin.Shake(this.game);
    this.game.plugins.add(this.shake);
    this.shaken = false;
};

Invaders.Game.prototype.handleLeftKeyDown = function (key) {
    'use strict';
    this.hero.moveLeft();
};

Invaders.Game.prototype.handleRightKeyDown = function (key) {
    'use strict';
    this.hero.moveRight();
};

Invaders.Game.prototype.handleMoveKeyUp = function (key) {
    'use strict';

    if (this.moveRightKey.isDown) {
        this.hero.moveRight();
    } else if (this.moveLeftKey.isDown) {
        this.hero.moveLeft();
    } else {
        this.hero.stop();
    }
};

Invaders.Game.prototype.handleFireKeyDown = function (key) {
    'use strict';
    this.hero.fire();
};

Invaders.Game.prototype.handleFireKeyUp = function (key) {
    'use strict';
    this.hero.stopFire();
};

Invaders.Game.prototype.collideWalls = function (enemy, wall) {
    'use strict';
    enemy.parent.setAll('body.velocity', { x: 0, y: 0 });
    this.enemyTween = this.game.add.tween(this.enemies.children[0].body.velocity);
    this.enemyTween.from({ y: 100 }, 0, Phaser.Easing.Linear.None);
    this.enemyTween.onComplete.add(this.enemies.onMoveDownCompleted, this.enemies);
    this.enemyTween.start();
};

Invaders.Game.prototype.reachFinish = function (finish, enemy) {
    'use strict';
    this.isTheEnd();
};

Invaders.Game.prototype.hitEnemy = function (ship, projectile) {
    'use strict';
    this.points += ship.reward;
    ship.hit();
    projectile.hit();
};

Invaders.Game.prototype.hitHero = function (ship, projectile) {
    'use strict';
    ship.hit();
    projectile.hit();

    this.shake.shake(5);
};

Invaders.Game.prototype.hitBarrier = function (ship, projectile) {
    'use strict';
    ship.hit();
    projectile.hit();

    this.shake.shake(3);
};

Invaders.Game.prototype.updatePointsLabel = function () {
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
};
