/*global Phaser */
/*global Cookies */

var TextSwitch = function (game, x, y, label, connectedSetting, negate, normalColor, hoverColor) {
    'use strict';
    Phaser.Button.call(this, game, x, y, '', this.changeSetting, this);
    this.anchor.setTo(0.5, 0.5);
    
    this.normalColor = normalColor || 0xAAAAAA;
    this.hoverColor = hoverColor || 0xDDDDDD;
    this.connectedSetting = connectedSetting;
    this.negate = negate || false;
    
    this.label = this.game.add.bitmapText(0, 0, 'batmanForever', label, 25);
    this.label.x = -this.label.width / 2;
    this.label.tint = this.normalColor;
    this.label.align = 'center';
    this.addChild(this.label);
    
    this.valueLabel = this.game.add.bitmapText(0, 0, 'batmanForever', 'On', 25);
    this.valueLabel.x = this.label.x + this.label.width  + 30;
    this.valueLabel.tint = this.normalColor;
    this.valueLabel.align = 'center';
    this.addChild(this.valueLabel);
    this.updateValueLabel();
    
    this.events.onInputOver.add(this.onButtonHover, this);
    this.events.onInputOut.add(this.onButtonOut, this);
    
    this.game.add.existing(this);
};
TextSwitch.prototype = Object.create(Phaser.Button.prototype);
TextSwitch.prototype.constructor = TextSwitch;

Object.defineProperty(TextSwitch.prototype, 'settingValue', {
    get: function () {
        'use strict';
        var cookie = Cookies.get(this.connectedSetting);
        return (cookie !== undefined && cookie !== 'false') !== this.negate;
    },
    set: function (value) {
        'use strict';
        Cookies.set(this.connectedSetting, value !== this.negate);
    }
});

TextSwitch.prototype.onButtonHover = function (pointer, event) {
    'use strict';
    this.label.tint = this.hoverColor;
    this.valueLabel.tint = this.hoverColor;
};

TextSwitch.prototype.onButtonOut = function () {
    'use strict';
    this.label.tint = this.normalColor;
    this.valueLabel.tint = this.normalColor;
};

TextSwitch.prototype.changeSetting = function () {
    'use strict';
    this.settingValue = !this.settingValue;
    this.updateValueLabel();
};

TextSwitch.prototype.updateValueLabel = function () {
    'use strict';
    var newText;
    
    switch (this.settingValue) {
    case true:
        newText = 'On';
        break;
    case false:
        newText = 'Off';
        break;
    }
    this.valueLabel.setText(newText);
    this.valueLabel.updateTransform();
};