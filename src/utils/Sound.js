/*global Phaser */
/*global Config */
/*global Cookies */

var Sound = function (game, name, category, volume, loop) {
    'use strict';
    
    Phaser.Sound.call(this, game, name, volume, loop);
    
    this.category = category;
};
Sound.prototype = Object.create(Phaser.Sound.prototype);
Sound.prototype.constructor = Sound;

Sound.prototype.play = function (marker, position, volume, loop, forceRestart) {
    'use strict';
    var muteByCategory = Cookies.get('mute' + this.category);
    
    if (muteByCategory === undefined || muteByCategory === 'false') {
        Phaser.Sound.prototype.play.call(this, marker, position, volume, loop, forceRestart);
    }
};