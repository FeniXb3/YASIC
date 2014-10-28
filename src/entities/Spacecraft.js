/*global Phaser */
/*global Config */
/*global Gun */
/*global Projectile */
/*global Sound */
/*jslint plusplus: true */

var Spacecraft = function (game, x, y, image, engines, guns) {
    'use strict';
    x = x || 0;
    y = y || 0;
    engines = engines || [];
    guns = guns || [];
    
    Phaser.Sprite.call(this, game, x, y, image);
    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.scale.setTo(0.8, 0.8);

    this.start = {
        x: x,
        y: y
    };
    
    this.setupExplosion();
    this.setupEngines(engines);
    this.setupGuns(guns);
};
Spacecraft.prototype = Object.create(Phaser.Sprite.prototype);
Spacecraft.prototype.constructor = Spacecraft;


Object.defineProperty(Spacecraft.prototype, "velocity", {
    get: function () {
        'use strict';
        return this.body.velocity.x;
    },
    set: function (value) {
        'use strict';
        var angle,
            angleChange = 15;
        
        this.body.velocity.x = value;
        this.body.velocity.y = 0;
        
        if (this.engines !== undefined) {
            if (value > 0) {
                angle = angleChange;
            } else if (value < 0) {
                angle = -angleChange;
            } else {
                angle = 0;
            }
            
            this.engines.forEach(function (engine) {
                if (engine.angle >= -angleChange && engine.angle <= angleChange) {
                    engine.angle = angle;
                } else {
                    engine.angle = (angle * -1) + 180;
                }
            });
        }
    }
});

Spacecraft.prototype.destroy = function () {
    'use strict';
    if (this.explosionSound !== undefined) {
        this.explosionSound.destroy();
    }
    
    Phaser.Sprite.prototype.destroy.call(this);
};

Spacecraft.prototype.hit = function () {
    'use strict';
    this.damage(1);
    this.resetExplosion();
    this.startExplosion();
};

Spacecraft.prototype.setupExplosion = function () {
    'use strict';
    this.explosion = this.game.add.sprite(this.x, this.y, 'explosion');
    this.explosion.anchor.setTo(0.5, 0.5);
    this.explosion.visible = false;
    this.explosionSound = new Sound(this.game, 'explosion', 'SFX', 0.5);
};

Spacecraft.prototype.resetExplosion = function () {
    'use strict';
    this.explosion.visible = true;
    this.explosion.alpha = 1;
    this.explosion.scale.setTo(1, 1);
    this.explosion.position.setTo(this.x, this.y);
    this.explosion.angle = Math.random() * 360 - 180;
};

Spacecraft.prototype.startExplosion = function () {
    'use strict';
    var explosionTween = this.game.add.tween(this.explosion.scale);
    explosionTween.from({ x: 0.0, y: 0.0 }, 0, Phaser.Easing.Exponential.Out, true);
    
    explosionTween = this.game.add.tween(this.explosion);
    explosionTween.to({ alpha: 0 }, 0, Phaser.Easing.Exponential.Out, true, 100);
    this.explosionSound.volume = 0.5;
    this.explosionSound.play();
};

Spacecraft.prototype.setupEngines = function (engines) {
    'use strict';
    var i,
        current,
        engineTween,
        delay;
    engines = engines || [];
    
    if (engines.length > 0) {
        this.engines = this.game.add.group();
        
        delay = Math.floor(Math.random * 1300 + 10);
        for (i = 0; i < engines.length; i++) {
            current = this.game.add.sprite(engines[i].x, engines[i].y, 'engine');
            current.anchor.setTo(0.5, 0.1);
            current.angle = engines[i].angle;
            if (engines[i].scale !== undefined) {
                current.scale.x = engines[i].scale.x;
                current.scale.y = engines[i].scale.y;
            }
            if (engines[i].flip) {
                current.scale.x *= -1;
            }
            if (engines[i].tint !== undefined) {
                current.tint = parseInt(engines[i].tint, 16);
            }
            
            engineTween = this.game.add.tween(current.scale);
            engineTween.from({ x: 0.7 * current.scale.x, y: 0.6 * current.scale.y}, 0, Phaser.Easing.Sinusoidal.In, true, delay, Number.MAX_VALUE, true);

            engineTween = this.game.add.tween(current);
            engineTween.from({ alpha: 0.7 }, 0, Phaser.Easing.Exponential.Out, true, delay, Number.MAX_VALUE, true);
            
            this.engines.add(current);
        }
        this.addChild(this.engines);
    }
};

Spacecraft.prototype.setupGuns = function (guns) {
    'use strict';
    var i;
    guns = guns || [];
    
    if (guns.length > 0) {
        this.gunfires = this.game.add.group();

        for (i = 0; i < guns.length; i++) {
            this.gunfires.add(new Gun(this.game, guns[i]));
        }
        this.addChild(this.gunfires);
    }
    
    this.shooting = false;
    this.projectiles = this.game.add.group();
};

Spacecraft.prototype.fire = function (projectiles) {
    'use strict';
    var that = this,
        bullet,
        index,
        x,
        y;
    projectiles = projectiles || this.projectiles;
    
    if (this.alive && !this.blocked) {
        this.shooting = true;
        this.gunfires.forEach(function (gun) {
            x = that.x + gun.x;
            y = that.y + gun.y;
            if (projectiles.countDead() > 0) {
                bullet = projectiles.getFirstDead();
                bullet.x = x;
                bullet.y = y;
                bullet.revive();
            } else {
                bullet = new Projectile(that.game, x, y, gun.ammo.type, gun.angle, gun.ammo.velocity);
                projectiles.add(bullet);
            }
            if (gun.sound !== undefined) {
                gun.sound.play();
            }
        });
        this.gunfires.setAll('visible', true);

        setTimeout(function () {
            that.gunfires.setAll('visible', false);
        }, 100);
    }
};
