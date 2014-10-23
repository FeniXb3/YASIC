/*global describe */
/*global it */
/*global expect */
/*global beforeEach */
/*global Phaser */
/*global Config */
/*global Invaders */
/*global spyOn */
/*global afterEach */
/*global TextButton */
/*global xit*/
/*global xdescribe*/
/*global invokeKeydown */
/*global translateByAnchor */

describe('Game', function () {
    'use strict';
    var game,
        gameState,
        mainMenuStateCreateMethod,
        hero,
        x,
        volume;

    beforeEach(function (done) {
        mainMenuStateCreateMethod = Invaders.MainMenu.prototype.create;
        spyOn(Invaders.MainMenu.prototype, 'create').and.callFake(function () {
            mainMenuStateCreateMethod.call(game.state.states.MainMenu);
            game.state.states.MainMenu.startButton.events.onInputUp.dispatch();
            setTimeout(function () {
                gameState = game.state.states.Game;
                hero = gameState.hero;
                done();
            }, 500);
        });
        
        
        game =  new Phaser.Game(Config.MAP_WIDTH, Config.MAP_HEIGHT, Phaser.CANVAS, 'GanymedeInvaders');
        game.state.add('Boot', Invaders.Boot);
        game.state.add('Preloader', Invaders.Preloader);
        game.state.add('MainMenu', Invaders.MainMenu);
        game.state.add('Game', Invaders.Game);
        game.state.start('Boot');
    });
    
    afterEach(function (done) {
        if (game.state.states.Game.hero !== undefined) {
            game.state.states.Game.hero.engineSound.stop();
        }
        setTimeout(function () {
            game.destroy();
            done();
        }, 10);
    });
    
    it('should be started', function () {
        expect(game.state.current).toEqual('Game');
    });
    
    it('should display background on the whole screen', function () {
        expect(gameState.background).toBeVisible();
        expect(gameState.background.width).toEqual(Config.MAP_WIDTH);
        expect(gameState.background.height).toEqual(Config.MAP_HEIGHT);
    });
        
    xdescribe('Special enemy', function () {
        
    });
    
    xdescribe('Obstacle', function () {
        
    });
    
    xdescribe('Laser', function () {
        describe('when hits enemy', function () {
            it('should kill it', function () {
                
            });
        });
        
        describe('when hits special enemy', function () {
            it('should damage it', function () {
                
            });
        });
        
        describe('when hits obstacle', function () {
            it('should damage it', function () {
                
            });
            
            
            xit('should destroy part of it', function () { // shatter ?
                
            });
            
            describe('when obstacle has low health', function () {
                it('should destroy it', function () {

                });
            });
        });
    });
});
