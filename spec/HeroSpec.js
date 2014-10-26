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
/*global setupGame */

describe('Hero', function () {
    'use strict';
    var game,
        gameState,
        mainMenuStateCreateMethod,
        hero,
        x,
        volume,
        enemiesAlive,
        preKillPoints,
        preKillPointsText;

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
        
        game = setupGame();
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
    
    it('should be displayed at the bottom', function () {
        expect(hero).toBeVisible();

        expect(hero).toBeAt({ x: Config.MAP_WIDTH / 2, y: Config.MAP_HEIGHT - 60});
    });

    it('should loop engine sound', function () {
        expect(hero.engineSound.isPlaying).toBeTruthy();
        expect(hero.engineSound.loop).toBeTruthy();
    });

    it('should not be shooting', function () {
        expect(hero.shooting).not.toBeTruthy();
    });

    describe('when left arrow is pressed', function () {
        beforeEach(function (done) {
            var heroMoveLeft = hero.moveLeft;
            spyOn(hero, 'moveLeft').and.callFake(function () {
                heroMoveLeft.call(hero);
                setTimeout(function () {
                    done();
                }, 50);
            });
            x = hero.x;
            volume = hero.engineSound.volume;
            invokeKeydown(Phaser.Keyboard.LEFT, game);
        });

        it('should move left', function () {
            expect(hero.x).toBeLessThan(x);
        });

        xit('should have louder engine sound', function () {
            expect(hero.engineSound.volume).toBeGreaterThan(volume);
        });

        it('should have engine effect turned right to show move', function () {
            expect(hero.engines.children[0].angle).toBeLessThan(0);
        });

        describe('when left arrow is back up', function () {
            beforeEach(function (done) {
                gameState.moveLeftKey.isDown = false;
                gameState.moveLeftKey.onUp.dispatch();
                setTimeout(function () {
                    x = hero.x;
                    setTimeout(function () {
                        done();
                    }, 100);
                }, 100);
            });

            it('should stop moving', function () {
                expect(hero.x).toEqual(x);
            });

            it('should have engine sound back to idle volume', function () {
                expect(hero.engineSound.volume).toEqual(volume);
            });

            it('should have engine effect stright', function () {
                expect(hero.engines.children[0].angle).toEqual(0);
            });
        });
    });

    describe('when right arrow is pressed', function () {
        beforeEach(function (done) {
            var heroMoveRight = hero.moveRight;
            spyOn(hero, 'moveRight').and.callFake(function () {
                heroMoveRight.call(hero);
                setTimeout(function () {
                    done();
                }, 50);
            });
            x = hero.x;
            volume = hero.engineSound.volume;
            invokeKeydown(Phaser.Keyboard.RIGHT, game);
        });

        it('should move right', function () {
            expect(hero.x).toBeGreaterThan(x);
        });

        it('should have louder engine sound', function () {
            expect(hero.engineSound.volume).toBeGreaterThan(volume);
        });

        it('should have engine effect turned left to show move', function () {
            expect(hero.engines.children[0].angle).toBeGreaterThan(0);
        });

        describe('when right arrow is back up', function () {
            beforeEach(function (done) {
                gameState.moveRightKey.isDown = false;
                gameState.moveRightKey.onUp.dispatch();
                setTimeout(function () {
                    x = hero.x;
                    setTimeout(function () {
                        done();
                    }, 100);
                }, 100);
            });

            it('should stop moving', function () {
                expect(hero.x).toEqual(x);
            });

            it('should have engine sound back to idle volume', function () {
                expect(hero.engineSound.volume).toEqual(volume);
            });

            it('should have engine effect stright', function () {
                expect(hero.engines.children[0].angle).toEqual(0);
            });
        });
    });

    describe('when space is pressed', function () {
        beforeEach(function (done) {
            enemiesAlive = gameState.enemies.countLiving();
            preKillPoints = gameState.points;
            preKillPointsText = gameState.pointsLabel.text;
            
            invokeKeydown(Phaser.Keyboard.SPACEBAR, game);
            setTimeout(function () {
                done();
            }, 400);
        });

        it('should be shooting', function () {
            expect(hero.shooting).toBeTruthy();
        });
        
        xit('should play laser sound', function () {
            expect(hero.laserSound.isPlaying).toBeTruthy();
        });
        
        it('should kill enemy on the line of fire with explosion', function () {
            expect(enemiesAlive).toBeGreaterThan(gameState.enemies.countLiving());
        });
        
        it('should get points for killed enemy', function () {
            expect(gameState.points).toBeGreaterThan(preKillPoints);
        });
        
        it('should update points text after kill', function () {
            expect(gameState.pointsLabel.text).not.toEqual(preKillPointsText);
        });
    });
});
