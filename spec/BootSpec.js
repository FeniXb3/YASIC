/*global describe */
/*global it */
/*global expect */
/*global beforeEach */
/*global afterEach */
/*global Phaser */
/*global Config */
/*global Invaders */
/*global spyOn */

describe('Boot', function () {
    'use strict';
    var game;
    
    beforeEach(function (done) {
        spyOn(Invaders.Preloader.prototype, 'create').and.callFake(function () {
            setTimeout(function () {
                done();
            }, 100);
        });
        
        game =  new Phaser.Game(Config.MAP_WIDTH, Config.MAP_HEIGHT, Phaser.CANVAS, 'YASIC');
        game.state.add('Boot', Invaders.Boot);
        game.state.add('Preloader', Invaders.Preloader);
        game.state.start('Boot');
        
    });
    
    afterEach(function () {
        game.destroy();
    });
    
    
    it('should load Batman Forever font', function () {
        expect(game.cache.checkBitmapFontKey('batmanForever')).toBeTruthy();
    });
    
    it('should load background', function () {
        expect(game.cache.checkImageKey('bg')).toBeTruthy();
    });
    
    it('should start Preloader state', function () {
        expect(game.state.current).toEqual('Preloader');
    });
});