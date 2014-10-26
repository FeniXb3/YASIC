/*global describe */
/*global it */
/*global expect */
/*global beforeEach */
/*global afterEach */
/*global Phaser */
/*global Config */
/*global Invaders */
/*global spyOn */
/*global setupGame */

describe('Boot', function () {
    'use strict';
    var game;
    
    beforeEach(function (done) {
        spyOn(Invaders.Preloader.prototype, 'create').and.callFake(function () {
            setTimeout(function () {
                done();
            }, 100);
        });
        
        game = setupGame();
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