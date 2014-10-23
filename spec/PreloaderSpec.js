/*global describe */
/*global it */
/*global xit */
/*global expect */
/*global beforeEach */
/*global Phaser */
/*global Config */
/*global Invaders */
/*global spyOn */
/*global afterEach */

describe('Preloader ', function () {
    'use strict';
    var game;

    beforeEach(function (done) {
        spyOn(Invaders.MainMenu.prototype, 'create').and.callFake(function () {
            done();
        });
        
        game =  new Phaser.Game(Config.MAP_WIDTH, Config.MAP_HEIGHT, Phaser.CANVAS, 'GanymedeInvaders');
        game.state.add('Boot', Invaders.Boot);
        game.state.add('Preloader', Invaders.Preloader);
        game.state.add('MainMenu', Invaders.MainMenu);
        game.state.start('Boot');
    });
    
    afterEach(function (done) {
        setTimeout(function () {
            game.destroy();
            done();
        }, 500);
    });
    
    it('should load hero image', function () {
        expect(game.cache.checkImageKey('hero')).toBeTruthy();
    });
    
    it('should load gunfire image', function () {
        expect(game.cache.checkImageKey('gunfire')).toBeTruthy();
    });
    
    it('should load laser image', function () {
        expect(game.cache.checkImageKey('laser')).toBeTruthy();
    });
    it('should load engine effect image', function () {
        expect(game.cache.checkImageKey('engine')).toBeTruthy();
    });
    
    it('should load rocket image', function () {
        expect(game.cache.checkImageKey('rocket')).toBeTruthy();
    });
    
    it('should load explosion effect image', function () {
        expect(game.cache.checkImageKey('explosion')).toBeTruthy();
    });
    
    it('should load live image', function () {
        expect(game.cache.checkImageKey('live')).toBeTruthy();
    });
    
    // enemies
    
    it('should load croissant image', function () {
        expect(game.cache.checkImageKey('croissant')).toBeTruthy();
    });
    
    it('should load troll image', function () {
        expect(game.cache.checkImageKey('spider')).toBeTruthy();
    });
    
    it('should load priest image', function () {
        expect(game.cache.checkImageKey('diadem')).toBeTruthy();
    });
    
    it('should load optimus image', function () {
        expect(game.cache.checkImageKey('batarang')).toBeTruthy();
    });
    
    // sounds
    
    it('should load engine sound', function () {
        expect(game.cache.checkSoundKey('engine')).toBeTruthy();
    });
    
    it('should load laser sound', function () {
        expect(game.cache.checkSoundKey('laser')).toBeTruthy();
    });
    
    // other
    
    it('should start MainMenu state', function () {
        expect(game.state.current).toEqual('MainMenu');
    });
});