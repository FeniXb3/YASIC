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

describe('MainMenu ', function () {
    'use strict';
    var game,
        mainMenuState,
        mainMenuStateCreateMethod,
        buttonTint;

    beforeEach(function (done) {
        mainMenuStateCreateMethod = Invaders.MainMenu.prototype.create;
        spyOn(Invaders.MainMenu.prototype, 'create').and.callFake(function () {
            mainMenuStateCreateMethod.call(game.state.states.MainMenu);
            mainMenuState = game.state.states.MainMenu;
            setTimeout(function () {
                done();
            }, 1000);
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
        }, 500);
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

        describe('when hovered', function () {
            beforeEach(function () {
                buttonTint = mainMenuState.startButton.label.tint;
                mainMenuState.startButton.events.onInputOver.dispatch();
            });

            it('should change text color', function () {
                expect(mainMenuState.startButton.label.tint).not.toEqual(buttonTint);
            });
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
});