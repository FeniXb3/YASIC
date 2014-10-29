/*jslint plusplus: true */
/*global TextButton */

var Menu = function (game, x, y, distance, menuData, font, size, backItem) {
    'use strict';
    var i,
        button,
        jsonItem;
    
    size = size || 25;
    
    this.game = game;
    this.items = {};
    
    for (i = 0; i < menuData.items.length; i++) {
        jsonItem = menuData.items[i];
        button = new TextButton(game, x, y, jsonItem.label, font, size, this.buttonCallback, this, menuData.style.normal.tint, menuData.style.hover.tint, jsonItem);
        this.items[jsonItem.name] = button;
        y += distance;
    }
    
    if (backItem !== undefined) {
        backItem.label = backItem.label || "Back";
        
        button = new TextButton(game, x, y, backItem.label, font, size, this.buttonCallback, this,
                                menuData.style.normal.tint, menuData.style.hover.tint, { type: "state", "data": backItem.data});
        this.items.back = button;
    }
};

Menu.prototype = {};
Menu.prototype.constructor = Menu;

Menu.prototype.buttonCallback = function (button) {
    'use strict';
    switch (button.item.type) {
    case "state":
        this.openState(button.item);
        break;
    case "link":
        this.openLink(button.item);
        break;
    }
};

Menu.prototype.openState = function (context) {
    'use strict';
    this.game.state.start(context.data);
};

Menu.prototype.openLink = function (context) {
    'use strict';
    window.open(context.data, '_blank');
};