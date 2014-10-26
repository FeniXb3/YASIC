/*global beforeEach */
/*global jasmine */
/*global console */
/*global Phaser */
/*global Config */
/*global Invaders */
/*jslint plusplus: true */
/*global setupGame */

function setupGame() {
    'use strict';
    var game =  new Phaser.Game(Config.MAP_WIDTH, Config.MAP_HEIGHT, Phaser.CANVAS, 'YASIC');
    game.state.add('Boot', Invaders.Boot);
    game.state.add('Preloader', Invaders.Preloader);
    game.state.add('MainMenu', Invaders.MainMenu);
    game.state.add('Settings', Invaders.Settings);
    game.state.add('Game', Invaders.Game);
    game.state.start('Boot');
    
    return game;
}


beforeEach(function () {
    'use strict';
    jasmine.addMatchers({
        toBeVisible: function () {
            return {
                compare: function (actual) {
                    var result = {};
                    result.pass = actual.visible;
                    
                    if (result.pass) {
                        result.message = "Expected " + actual.key + " not to be visible";
                    } else {
                        result.message = "Expected " + actual.key + " to be visible";
                    }
                    
                    return result;
                }
            };
        },
        toBeAt: function () {
            return {
                compare: function (actual, expected) {
                    var result = {};
                    result.pass = (actual.x === expected.x && actual.y === expected.y);
                    
                    if (result.pass) {
                        result.message = "Expected " + actual.key + " not to be at ["
                            + expected.x + ", " + expected.y + "]";
                    } else {
                        result.message = "Expected " + actual.key + " to be at ["
                            + expected.x + ", " + expected.y + "], but was at ["
                            + actual.x + ", " + actual.y + "]";
                    }
                    
                    return result;
                }
            };
        },
        toContain: function () {
            return {
                compare: function (actual, expected) {
                    var result = { pass: false },
                        key,
                        i;
                    
                    for (i = 0; i < actual.length; i++) {
                        result.pass = true;
                        for (key in expected) {
                            if (expected.hasOwnProperty(key) && actual[i].hasOwnProperty(key)) {
                                if (!expected.hasOwnProperty(key) || !actual[i].hasOwnProperty(key) || actual[i][key] !== expected[key]) {
                                    result.pass = false;
                                    break;
                                }
                            }
                        }
                        if (result.pass) {
                            break;
                        }
                    }
                    
                    if (result.pass) {
                        result.message = "Expected collection not to contain object with properties: " + JSON.stringify(expected);
                    } else {
                        result.message = "Expected collection to contain object with properties: " + JSON.stringify(expected);
                    }
                    
                    return result;
                }
            };
        }
    });
});


function invokeKeydown(code, game) {
    // code found at this SO answer - http://stackoverflow.com/a/23700583/1816426
    'use strict';
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack: filter this otherwise Safari will complain
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        Object.defineProperty(oEvent, 'keyCode', {
            get : function () {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(oEvent, 'which', {
            get : function () {
                return this.keyCodeVal;
            }
        });
    }

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, code, code);
    } else {
        oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, code, 0);
    }

    oEvent.keyCodeVal = code;

    if (oEvent.keyCode !== code) {
        console.log("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ") -> " + code);
    }

    game.input.keyboard.processKeyDown(oEvent);
}

function translateByAnchor(point, parent) {
    'use strict';
    
    return { x: point.x - (parent.anchor.x * parent.width), y: point.y - (parent.anchor.y * parent.height) };
}
