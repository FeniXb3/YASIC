/*
    Simple "Shake" plugin
    Created by cocoademon - https://gist.github.com/cocoademon/7276093
    Updated by FeniXb3 - https://gist.github.com/FeniXb3/411184d90690a4922e7d
*/

/*global Phaser */
/*jslint bitwise: true */

Phaser.Plugin.Shake = function (game, parent) {
    'use strict';
    Phaser.Plugin.call(this, game, parent);
 
    this.offsetX = 0;
    this.offsetY = 0;
    this.move = false;

    this.size = 20;
    this.amt = 0.0;

    this.cache = 0;
    this.objectToShake = this.game.camera.displayObject;
};
 
Phaser.Plugin.Shake.prototype = Object.create(Phaser.Plugin.prototype);
 
Phaser.Plugin.Shake.prototype.postUpdate = function () {
    'use strict';
    this.cache = this.amt * this.size;

    this.offsetX = ((Math.random() * 2 - 1) * this.cache) | 0;
    this.offsetY = ((Math.random() * 2 - 1) * this.cache) | 0;

    this.objectToShake.position.x += this.offsetX;
    this.objectToShake.position.y += this.offsetY;

    // TODO: make configurable if shaking should fade out
    this.amt *= 0.95; // Todo: framerate independence!
    this.move = true;
};
 
Phaser.Plugin.Shake.prototype.postRender = function () {
    'use strict';
    if (this.move) {
        this.objectToShake.position.x -= this.offsetX;
        this.objectToShake.position.y -= this.offsetY;
        
        this.move = false;
    }
};
 
Phaser.Plugin.Shake.prototype.shake = function (size, objectToShake) {
    'use strict';
    this.size = size || this.size;
    this.objectToShake = objectToShake || this.objectToShake;
    
    this.amt = 1.0;
};