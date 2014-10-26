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
/*global setupGame */
/*jslint plusplus: true */

describe('MainMenu ', function () {
    'use strict';
    var game,
        mainMenuState,
        mainMenuStateCreateMethod,
        hero,
        enemy,
        i,
        j;

    beforeEach(function (done) {
        mainMenuStateCreateMethod = Invaders.MainMenu.prototype.create;
        spyOn(Invaders.MainMenu.prototype, 'create').and.callFake(function () {
            mainMenuStateCreateMethod.call(game.state.states.MainMenu);
            mainMenuState = game.state.states.MainMenu;
            setTimeout(function () {
                done();
            }, 1000);
        });
        
        game = setupGame();
    });
    
    
    afterEach(function (done) {
        hero = game.state.states.Game.hero;
        if (hero !== undefined) {
            hero.engineSound.stop();
            for (j = 0; j < hero.gunfires.length; j++) {
                hero.gunfires.children[j].sound.stop();
            }
        }
        if (game.state.states.Game.enemies !== undefined) {
            
            for (i = 0; i < game.state.states.Game.enemies.length; i++) {
                enemy = game.state.states.Game.enemies.children[i];
                enemy.explosionSound.stop();
                for (j = 0; j < enemy.gunfires.length; j++) {
                    enemy.gunfires.children[j].sound.stop();
                }
            }
        }
        
        setTimeout(function () {
            game.destroy();
            setTimeout(function () {
                done();
            }, 500);
        }, 1500);
    });
    
    it('should display background on the whole screen', function () {
        expect(mainMenuState.background).toBeVisible();
        expect(mainMenuState.background.width).toEqual(Config.MAP_WIDTH);
        expect(mainMenuState.background.height).toEqual(Config.MAP_HEIGHT);
    });
    
    describe('Start button', function () {
        it('should be displayed with "Start game" text', function () {
            expect(mainMenuState.startButton instanceof TextButton).toBeTruthy();
            expect(mainMenuState.startButton.label.text).toEqual('Start game');
        });

        describe('when clicked', function () {
            beforeEach(function (done) {
                mainMenuState.startButton.events.onInputUp.dispatch();
                setTimeout(function () {
                    done();
                }, 1000);
            });

            it('should start game', function () {
                expect(game.state.current).toEqual('Game');
            });
        });
    });
    
        
    describe('Options button', function () {
        it('should be displayed with "Settings" text', function () {
            expect(mainMenuState.settingsButton instanceof TextButton).toBeTruthy();
            expect(mainMenuState.settingsButton.label.text).toEqual('Settings');
        });

        describe('when clicked', function () {
            beforeEach(function (done) {
                mainMenuState.settingsButton.events.onInputUp.dispatch();
                setTimeout(function () {
                    done();
                }, 1000);
            });

            it('should open settings', function () {
                expect(game.state.current).toEqual('Settings');
            });
        });
    });
});