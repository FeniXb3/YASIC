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
/*jslint plusplus: true */
/*global jasmine */

describe('Enemies', function () {
    'use strict';
    var game,
        gameState,
        mainMenuStateCreateMethod,
        hero,
        x,
        volume,
        rocketsCount,
        heroHealth,
        preKillPoints;
    
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    beforeEach(function (done) {
        mainMenuStateCreateMethod = Invaders.MainMenu.prototype.create;
        spyOn(Invaders.MainMenu.prototype, 'create').and.callFake(function () {
            mainMenuStateCreateMethod.call(game.state.states.MainMenu);
            game.state.states.MainMenu.startButton.events.onInputUp.dispatch();
            setTimeout(function () {
                gameState = game.state.states.Game;
                hero = gameState.hero;
                done();
            }, 100);
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
    
    it('should be visible in quantity of 32', function () {
        expect(gameState.enemies.children.length).toEqual(32);
    });
    
    xit('should be displayed in 4 rows', function () {
        var rows;
        expect(rows).toEqual(4);
    });
    
    xit('should be 5 in each row', function () {
        var enemiesInRows;
        expect(enemiesInRows).toEqual(5);
    });
    
    it('should move towards the right side', function () {
        var i,
            allHaveCorrectVelocity = true,
            velocity = 70;
        
        for (i  = 0; i < gameState.enemies.children.length; i++) {
            if (gameState.enemies.children[i].body.velocity.x !== velocity) {
                allHaveCorrectVelocity = false;
                break;
            }
        }
        
        expect(allHaveCorrectVelocity).toBeTruthy();
    });
    
    describe('when right border was reached', function () {
        beforeEach(function (done) {
            var collisionMethod = Invaders.Game.prototype.collideWalls;
            spyOn(Invaders.Game.prototype, 'collideWalls').and.callFake(function (enemy, wall) {
                collisionMethod.call(game.state.states.Game, enemy, wall);
                setTimeout(function () {
                    done();
                }, 100);
            });
        });
        
        it('should move down', function () {
            var i,
                allHaveCorrectVelocity = true;

            for (i  = 0; i < gameState.enemies.children.length; i++) {
                if (gameState.enemies.children[i].body.velocity.y <= 0 || gameState.enemies.children[i].body.velocity.x !== 0) {
                    allHaveCorrectVelocity = false;
                    break;
                }
            }
            expect(allHaveCorrectVelocity).toBeTruthy();
        });
        
        xit('should move faster after moving down');
        
        it('should start moving towards left border', function (done) {
            var i,
                allHaveCorrectVelocity = true;
            
            setTimeout(function () {
                for (i  = 0; i < gameState.enemies.children.length; i++) {
                    if (gameState.enemies.children[i].body.velocity.x >= 0) {
                        allHaveCorrectVelocity = false;
                        break;
                    }
                }
                expect(allHaveCorrectVelocity).toBeTruthy();
                done();
            }, 1500);
        });
        
        describe('when left border was reached', function () {
            beforeEach(function (done) {
                setTimeout(function () {
                    done();
                }, 2000);
            });
            
            it('should move down', function (done) {
                var i,
                    allHaveCorrectVelocity = true;
                setTimeout(function () {
                    for (i  = 0; i < gameState.enemies.children.length; i++) {
                        if (gameState.enemies.children[i].body.velocity.y <= 0 || gameState.enemies.children[i].body.velocity.x !== 0) {
                            allHaveCorrectVelocity = false;
                            break;
                        }
                    }
                    expect(allHaveCorrectVelocity).toBeTruthy();
                    done();
                }, 1500);
            });

            it('should start moving towards right border', function (done) {
                var i,
                    allHaveCorrectVelocity = true;

                setTimeout(function () {
                    for (i  = 0; i < gameState.enemies.children.length; i++) {
                        if (gameState.enemies.children[i].body.velocity.x <= 0) {
                            allHaveCorrectVelocity = false;
                            break;
                        }
                    }
                    expect(allHaveCorrectVelocity).toBeTruthy();
                    done();
                }, 2500);
            });
        });
    });
    
    describe('when shooting', function () {
        beforeEach(function (done) {
            rocketsCount = gameState.enemies.rockets.length;
            heroHealth = hero.health;
            setTimeout(function () {
                done();
            }, gameState.enemies.fireInterval);
        });
    
        it('should shoot from random enemy', function () {
            expect(gameState.enemies.rockets.length).toBeGreaterThan(rocketsCount);
        });

        it('should hit hero with rocket', function (done) {
            gameState.barriers.callAll('kill');
            hero.x = gameState.enemies.rockets.getFirstAlive().x;
            setTimeout(function () {
                expect(hero.health).toBeLessThan(heroHealth);
                done();
            }, 1500);
        });
    });
    
    describe('when all have died', function () {
        beforeEach(function (done) {
            hero.hit();
            heroHealth = hero.health;
            preKillPoints = gameState.points;
            gameState.enemies.forEachAlive(function (enemy) {
                enemy.hit();
            });
            setTimeout(function () {
                done();
            }, 200);
        });
        
        it('should all be alive again', function (done) {
            setTimeout(function () {
                expect(gameState.enemies.countLiving()).toEqual(gameState.enemies.length);
                done();
            }, 1000 + gameState.enemies.revivingTimeout);
        });
        
        it('should give extra points to player for each live left', function () {
            expect(gameState.points).toEqual(preKillPoints + heroHealth * 100);
        });
        
        it('should recover one live to player', function () {
            expect(hero.health).toEqual(heroHealth + 1);
        });
    });
});