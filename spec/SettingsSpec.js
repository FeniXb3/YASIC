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
/*global Cookies */

describe('Settings ', function () {
    'use strict';
    var game,
        settingsState,
        mainMenuStateCreateMethod,
        goingBack;

    beforeEach(function (done) {
        Cookies.expire('muteSFX');
        goingBack = false;
        mainMenuStateCreateMethod = Invaders.MainMenu.prototype.create;
        spyOn(Invaders.MainMenu.prototype, 'create').and.callFake(function () {
            mainMenuStateCreateMethod.call(game.state.states.MainMenu);
            setTimeout(function () {
                if (!goingBack) {
                    game.state.states.MainMenu.menu.items.settings.events.onInputUp.dispatch();
                    setTimeout(function () {
                        settingsState = game.state.states.Settings;
                        done();
                    }, 100);
                } else {
                    done();
                }
            }, 100);
        });
        
        game = setupGame();
    });
    
    afterEach(function (done) {
        if (game.state.states.Game.specialEnemy !== undefined) {
            clearTimeout(game.state.states.Game.specialEnemy.reviveTimeout);
        }
        if (game.state.states.Game.hero !== undefined) {
            game.state.states.Game.hero.engineSound.stop();
        }
        Cookies.expire('muteSFX');
        
        setTimeout(function () {
            game.destroy();
            setTimeout(function () {
                done();
            }, 100);
        }, 10);
    });
    
    describe('Sound effects option', function () {
        it('should be on', function () {
            expect(settingsState.sfxOption.valueLabel.text).toEqual('On');
        });

        describe('when clicked', function () {
            beforeEach(function (done) {
                settingsState.sfxOption.events.onInputUp.dispatch();
                setTimeout(function () {
                    done();
                }, 500);
            });

            it('should be off', function () {
                expect(settingsState.sfxOption.valueLabel.text).toEqual('Off');
            });
                        
            describe('when the game has been started', function () {
                beforeEach(function (done) {
                    goingBack = true;
                    settingsState.backButton.events.onInputUp.dispatch();
                    setTimeout(function () {
                        game.state.states.MainMenu.menu.items.start.events.onInputUp.dispatch();
                        setTimeout(function () {
                            done();
                        }, 1500);
                    }, 1000);
                });

                it('should not play engine sound', function () {
                    expect(game.state.states.Game.hero.engineSound.isPlaying).not.toBeTruthy();
                });
            });
            
            describe('when clicked again', function () {
                beforeEach(function (done) {
                    settingsState.sfxOption.events.onInputUp.dispatch();
                    setTimeout(function () {
                        done();
                    }, 500);
                });

                it('should be on again', function () {
                    expect(settingsState.sfxOption.valueLabel.text).toEqual('On');
                });
            });
        });
    });
    
    describe('Back button', function () {
        it('should be displayed with "Back" text', function () {
            expect(settingsState.backButton.label.text).toEqual('Back');
        });

        describe('when clicked', function () {
            beforeEach(function (done) {
                goingBack = true;
                settingsState.backButton.events.onInputUp.dispatch();
                setTimeout(function () {
                    done();
                }, 1000);
            });

            it('should open main menu again', function () {
                expect(game.state.current).toEqual('MainMenu');
            });
        });
    });
});